import { Injectable, Query, BadRequestException } from '@nestjs/common';
import { Course, PrismaClient } from '@prisma/client';
import { CreateActiveCodeDto } from './dto/create-active-code.dto';
import { randomBytes } from 'crypto';
import { ActiveCodeType, UserCourseStatus, CourseAccessType, ActiveCodeStatus } from '@/enums/enum';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});
@Injectable()
export class ActiveCodeService {
  private readonly prisma = new PrismaClient();

  async createActiveCode(dto: CreateActiveCodeDto, status: number) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order_id: dto.order_id,
        del_flg: false,
      },
    });
    if (!orderItems.length) return;

    for (const item of orderItems) {
      if (item.item_type === ActiveCodeType.COMBO && item.combo_id) {
        const comboCourses = await this.prisma.comboCourse.findMany({
          where: { combo_id: item.combo_id },
        });

        if (!comboCourses.length) continue;

        await Promise.all(
          comboCourses.map(async (cc) => {
            return this.prisma.activeCode.create({
              data: {
                order_item_id: item.order_item_id,
                combo_id: cc.combo_id,
                course_id: cc.course_id,
                customer_id: dto.user_id,
                code: this.generateCode(10),
                status,
                item_type: ActiveCodeType.COMBO,
              },
            });
          }),
        );
      } else if (item.item_type === ActiveCodeType.COURSE && item.course_id) {
        await this.prisma.activeCode.create({
          data: {
            order_item_id: item.order_item_id,
            course_id: item.course_id,
            customer_id: dto.user_id,
            code: this.generateCode(10),
            status,
            item_type: ActiveCodeType.COURSE,
          },
        });
      }
    }
  }

  private generateCode(length: number): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  async checkStatus(user_id: string, course_id: string) {
    const allCodes = await this.prisma.activeCode.findMany({
      where: { customer_id: user_id, course_id },
    });

    const userCourse = await this.prisma.userCourse.findFirst({
      where: { user_id, course_id, del_flg: false },
    });

    const unusedCode = allCodes.find((code) => code.status === ActiveCodeStatus.UNUSED);

    // ✅ THÊM: Kiểm tra mã UNUSED nhưng đã hết hạn
    const validUnusedCode = unusedCode && (!unusedCode.expires_at || unusedCode.expires_at > new Date());

    const isCourseExpired = userCourse?.expired_date && userCourse.expired_date < new Date();

    return {
      hasPurchased: allCodes.length > 0,
      hasUnusedCode: !!validUnusedCode, // ✅ Chỉ tính mã còn hiệu lực
      userCourseStatus: userCourse?.status ?? null,
      isActivated: userCourse?.status === UserCourseStatus.ACTIVE && !isCourseExpired,
      isExpired: isCourseExpired,
      canPurchase: !userCourse || isCourseExpired || !validUnusedCode,
      expired_date: userCourse?.expired_date ?? null,
    };
  }

  async activateCourse(user_id: string, course_id: string, code: string) {
    // 🔍 Tìm mã kích hoạt
    const activeCode = await this.prisma.activeCode.findFirst({
      where: { code },
    });

    if (!activeCode) {
      throw new BadRequestException(' Mã kích hoạt không tồn tại!');
    }

    // ✅ Kiểm tra mã thuộc khóa học
    if (activeCode.course_id !== course_id) {
      throw new BadRequestException(' Mã kích hoạt không thuộc khóa học này!');
    }

    // ✅ Kiểm tra với ActiveCodeStatus
    if (activeCode.status !== ActiveCodeStatus.UNUSED) {
      throw new BadRequestException(' Mã này đã được sử dụng!');
    }

    // ✅ Kiểm tra mã hết hạn
    if (activeCode.expires_at && activeCode.expires_at < new Date()) {
      throw new BadRequestException(' Mã kích hoạt đã hết hạn!');
    }

    // ✅ Cập nhật mã kích hoạt
    await this.prisma.activeCode.updateMany({
      where: { code },
      data: {
        status: ActiveCodeStatus.USED,
        used_at: new Date(),
      },
    });

    // 🔍 Lấy thông tin khóa học để tính expired_date
    const course = await this.prisma.course.findUnique({
      where: { course_id },
    });

    if (!course) {
      throw new BadRequestException('Khóa học không tồn tại!');
    }

    // 🗓️ Tính expired_date dựa trên access_type của khóa học
    const expired_date = this.getExpired(course);
    const enrolled_at = new Date();

    // ✅ Kiểm tra hoặc tạo bản ghi userCourse
    const existingCourse = await this.prisma.userCourse.findFirst({
      where: {
        user_id,
        course_id,
        del_flg: false,
      },
    });

    if (existingCourse) {
      await this.prisma.userCourse.update({
        where: { id: existingCourse.id },
        data: {
          status: UserCourseStatus.ACTIVE,
          last_accessed: new Date(),
          expired_date: expired_date,
        },
      });
    } else {
      await this.prisma.userCourse.create({
        data: {
          user_id,
          course_id: activeCode.course_id,
          status: UserCourseStatus.ACTIVE,
          enrolled_at: enrolled_at,
          expired_date: expired_date,
        },
      });
    }

    return {
      success: true,
      message: ' Kích hoạt khóa học thành công!',
      course_id: activeCode.course_id,
      expired_date: expired_date,
    };
  }

  async getActiveCodeByUser(user_id: string, course_id?: string, order_item_id?: string) {
    const where: any = { customer_id: user_id };
    if (course_id) where.course_id = course_id;
    if (order_item_id) where.order_item_id = order_item_id;

    const codes = await this.prisma.activeCode.findMany({
      where,
      select: {
        code: true,
        status: true,
        course_id: true,
        combo_id: true,
        item_type: true,
        order_item_id: true,
        expires_at: true,
      },
    });

    return codes;
  }

  private getExpired(course: Course, enrolledAt: Date = new Date()): Date | null {
    switch (course.access_type) {
      case CourseAccessType.LIMITED:
        if (course.access_duration_months && course.access_duration_months > 0) {
          const expiry = new Date(enrolledAt);
          expiry.setMonth(expiry.getMonth() + course.access_duration_months);
          return expiry;
        }
        return null;

      case CourseAccessType.EXPIRE_AT:
        return course.access_expire_at || null;

      case CourseAccessType.LIFETIME:
      default:
        return null; // Vĩnh viễn
    }
  }
  async getUnusedCodes(user_id: string, course_id: string) {
    return this.prisma.activeCode.findMany({
      where: {
        customer_id: user_id,
        course_id,
        status: 1, // UNUSED
      },
      select: { code: true },
    });
  }
}
