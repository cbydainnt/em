import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaClient, Course } from '@prisma/client';
import { SearchCourseDto } from './dto/search-course.dto';
import { UserService } from '../user/user.service';
import { ActiveCodeStatus, UserCourseStatus, CourseAccessType, PurchaseStatus } from '@/enums/enum';
import { subMinutes } from 'date-fns/subMinutes';

const prisma = new PrismaClient({
  errorFormat: 'colorless',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
  transactionOptions: {
    maxWait: 60000,
    timeout: 300000,
  },
});

interface UploadedFile {
  url: string;
  type: 'thumbnail' | 'video' | 'document';
  key: string;
  sectionIndex?: number;
  lessonIndex?: number;
}

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  private readonly prisma = new PrismaClient();
  private readonly userService = new UserService();

  async findViewCount(course_id: string) {
    const view_count = await this.prisma.course.findUnique({
      where: { course_id },
      select: { view_count: true },
    });
    return view_count?.view_count ?? 0;
  }
  async findByCourseId(course_id: string): Promise<any> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { course_id },
        include: {
          ratingSummary: true,
          sections: {
            include: {
              lessons: {
                select: {
                  lesson_id: true,
                  lesson_title: true,
                  lesson_video: true,
                  minutes: true,
                  lesson_order: true,
                  access_type: true,
                  documents: true,
                },
              },
            },
          },
        },
      });

      if (!course) return null;

      const total_lessons = course.sections.reduce((sum, section) => sum + (section.lessons?.length || 0), 0);
      const total_duration = course.sections.reduce((sum, section) => {
        const sectionDuration = section.lessons?.reduce((s, lesson) => s + (lesson.minutes || 0), 0);
        return sum + sectionDuration;
      }, 0);
      const total_documents = course.sections.reduce((sum, section) => {
        const sectionDocs = section.lessons?.reduce((s, lesson) => s + (lesson.documents?.length || 0), 0) || 0;

        return sum + sectionDocs;
      }, 0);

      const total_user = await this.userService.countUserByCourseId(course_id);

      return { ...course, total_lessons, total_duration, total_user, total_documents };
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findAll(): Promise<Course[]> {
    return await prisma.course.findMany();
  }

  async recordCourseView(course_id: string, userId?: string, userAgent?: string, ip?: string) {
    const THIRTY_MINUTES = 30 * 60 * 1000;

    const orConditions: any[] = [];

    if (userId && /^[a-f\d]{24}$/i.test(userId)) {
      orConditions.push({ user_id: userId });
    }

    if (ip) {
      orConditions.push({ ip_address: ip });
    }

    const existed = await this.prisma.courseView.findFirst({
      where: {
        course_id,
        ...(orConditions.length > 0 && { OR: orConditions }),
        created_at: {
          gte: new Date(Date.now() - THIRTY_MINUTES),
        },
      },
    });

    if (existed) return;

    await this.prisma.courseView.create({
      data: {
        course_id,
        user_id: userId && /^[a-f\d]{24}$/i.test(userId) ? userId : null,
        ip_address: ip,
        user_agent: userAgent,
      },
    });

    await this.prisma.course.update({
      where: { course_id },
      data: { view_count: { increment: 1 } },
    });
  }

  async getCoursesByCombo(comboId: string): Promise<Course[]> {
    try {
      const combo = await this.prisma.combo.findUnique({ where: { combo_id: comboId } });
      if (!combo || combo.del_flg) {
        throw new Error('Combo not found');
      }
      const comboCourses = await prisma.comboCourse.findMany({
        where: {
          combo_id: comboId,
          course: {
            OR: [{ access_type: { not: CourseAccessType.EXPIRE_AT } }, { access_type: CourseAccessType.EXPIRE_AT, access_expire_at: { gte: new Date() } }],
          },
        },

        include: {
          course: true,
        },
      });
      return comboCourses.map((cc) => cc.course || null).filter((course): course is Course => !!(course && !course.del_flg));
    } catch (error) {
      this.logger.error(`Error fetching courses for combo id ${comboId}`, error);
      throw error;
    }
  }

  async searchCourse(filters: SearchCourseDto, userId?: string): Promise<Course[]> {
    const { name, minPrice, maxPrice, state, sortBy, order, page = 1, limit = 10, comboId, categoryId, status } = filters;

    if (status && !userId) {
      throw new BadRequestException('user_id is required when filtering by status');
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = { del_flg: false };

    if (name) {
      where.course_name = {
        contains: name.trim(),
        mode: 'insensitive',
      };
    }

    if (state) where.state = state;

    if (minPrice || maxPrice) {
      where.course_price = {
        ...(minPrice && { gte: Number(minPrice) }),
        ...(maxPrice && { lte: Number(maxPrice) }),
      };
    }

    if (comboId || categoryId) {
      where.combos = {
        some: {
          ...(comboId && { combo_id: comboId }),
          ...(categoryId && {
            combo: {
              categories: {
                some: { category_id: categoryId },
              },
            },
          }),
        },
      };
    }

    const activeCodeCourseIds = await this.prisma.activeCode.findMany({
      where: {
        customer_id: userId,
        status: ActiveCodeStatus.UNUSED,
      },
      select: { course_id: true },
    });

    const purchasedCourseIds = activeCodeCourseIds.map((c) => c.course_id);

    // ===== STATUS FILTER =====
    if (status && userId) {
      const [userCourses, activeCodes] = await Promise.all([
        this.prisma.userCourse.findMany({
          where: { user_id: userId, del_flg: false },
          select: { course_id: true, status: true },
        }),
        this.prisma.activeCode.findMany({
          where: {
            customer_id: userId,
            status: ActiveCodeStatus.UNUSED,
          },
          select: { course_id: true },
        }),
      ]);

      if (status === PurchaseStatus.ACTIVATED) {
        where.user_courses = {
          some: {
            user_id: userId,
            status: UserCourseStatus.ACTIVE,
            del_flg: false,
          },
        };
      }
      if (status === PurchaseStatus.PURCHASED_NOT_ACTIVATED) {
        where.course_id = {
          in: purchasedCourseIds.length ? purchasedCourseIds : ['__none__'],
        };

        where.user_courses = {
          none: {
            user_id: userId,
            status: UserCourseStatus.ACTIVE,
          },
        };
      }

      const purchasedIds = await this.prisma.activeCode.findMany({
        where: { customer_id: userId },
        select: { course_id: true },
      });

      const activatedIds = await this.prisma.userCourse.findMany({
        where: { user_id: userId, status: UserCourseStatus.ACTIVE },
        select: { course_id: true },
      });

      const excludeIds = [...purchasedIds.map((p) => p.course_id), ...activatedIds.map((a) => a.course_id)];

      if (status === PurchaseStatus.NOT_PURCHASED) {
        where.course_id = {
          notIn: excludeIds.length ? excludeIds : ['__none__'],
        };
      }
    }
    // ==========================

    const orderBy: any[] = [];
    if (sortBy) {
      orderBy.push({ [sortBy]: order || 'asc' });
    } else {
      orderBy.push({ created_at: 'desc' });
    }

    const courses = await this.prisma.course.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
      include: {
        ratingSummary: true,
        combos: {
          include: {
            combo: {
              include: {
                categories: { include: { category: true } },
              },
            },
          },
        },
      },
    });

    return courses.map((course) => ({
      ...course,
      avg_rating: course.ratingSummary?.avg_rating || 0,
      total_reviews: course.ratingSummary?.total_reviews || 0,
    }));
  }

  async getSectionsWithLessons(courseId: string) {
    return await prisma.section.findMany({
      where: {
        course_id: courseId,
        del_flg: false,
      },
      include: {
        lessons: {
          where: { del_flg: false },
          orderBy: { lesson_order: 'asc' },
        },
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async getUserCourses(userId: string): Promise<any> {
    try {
      const paidOrders = await this.prisma.order.findMany({
        where: {
          user_id: userId,
          status: 2,
        },
        include: {
          order_items: {
            include: {
              course: {
                include: {
                  ratingSummary: true,
                  sections: {
                    include: {
                      lessons: {
                        where: { del_flg: false },
                        select: { lesson_id: true, minutes: true },
                      },
                    },
                  },
                },
              },
              combo: {
                include: {
                  courses: {
                    include: {
                      course: {
                        include: {
                          ratingSummary: true,
                          sections: {
                            include: {
                              lessons: {
                                where: { del_flg: false },
                                select: { lesson_id: true, minutes: true },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { created_at: 'desc' },
      });

      // Lấy user courses đã kích hoạt
      const userCourses = await this.prisma.userCourse.findMany({
        where: {
          user_id: userId,
          del_flg: false,
          status: UserCourseStatus.ACTIVE,
        },
        include: {
          course: {
            include: {
              ratingSummary: true,
              sections: {
                include: {
                  lessons: {
                    where: { del_flg: false },
                    select: { lesson_id: true, minutes: true },
                  },
                },
              },
            },
          },
        },
      });

      // Lấy tất cả active codes - BỎ filter customer_id
      const orderItemIds = paidOrders.flatMap((order) => order.order_items.map((item) => item.order_item_id));

      const activeCodes = await this.prisma.activeCode.findMany({
        where: {
          // BỎ: customer_id: userId, // Lấy tất cả active codes liên quan đến orders của user
          order_item_id: { in: orderItemIds },
        },
      });

      // Phân loại courses
      const activatedCourses = userCourses.filter((uc) => uc.course).map((uc) => this.formatCourseData(uc.course, 'activated', uc));

      const inactiveCourses: any[] = [];

      // Duyệt qua tất cả order items để tìm courses chưa kích hoạt
      paidOrders.forEach((order) => {
        order.order_items.forEach((item) => {
          if (item.course) {
            // Course đơn
            const isActivated = userCourses.some((uc) => uc.course_id === item.course.course_id);
            const activeCode = activeCodes.find((ac) => ac.course_id === item.course.course_id && ac.order_item_id === item.order_item_id);

            // CHỈ thêm vào inactive nếu:
            // 1. Chưa được kích hoạt VÀ
            // 2. Có active code
            if (!isActivated && activeCode) {
              inactiveCourses.push(this.formatCourseData(item.course, 'inactive', null, activeCode));
            }
          } else if (item.combo) {
            // Combo - xử lý tất cả courses trong combo
            item.combo.courses.forEach((comboCourse) => {
              const isActivated = userCourses.some((uc) => uc.course_id === comboCourse.course.course_id);
              const activeCode = activeCodes.find((ac) => ac.course_id === comboCourse.course.course_id && ac.order_item_id === item.order_item_id);

              // CHỈ thêm vào inactive nếu:
              // 1. Chưa được kích hoạt VÀ
              // 2. Có active code
              if (!isActivated && activeCode) {
                inactiveCourses.push(this.formatCourseData(comboCourse.course, 'inactive', null, activeCode));
              }
            });
          }
        });
      });

      // Loại bỏ trùng lặp
      const uniqueInactiveCourses = inactiveCourses.filter((course, index, self) => index === self.findIndex((c) => c.course_id === course.course_id));

      const favoriteCourses = [];

      return {
        favorite: favoriteCourses,
        activated: activatedCourses,
        inactive: uniqueInactiveCourses,
      };
    } catch (error: any) {
      this.logger.error(`Error fetching user courses for user ${userId}:`, error);
      throw error;
    }
  }

  async getAllUserCourse(userId: string): Promise<any> {
    try {
      const userCourses = await this.prisma.userCourse.findMany({
        where: {
          user_id: userId,
          del_flg: false,
        },
        include: {
          course: true,
        },
      });
      return userCourses;
    } catch (error) {
      throw new Error('Failed to get user courses');
    }
  }

  async reserveCourse(userCourseId: string) {
    const userCourse = await this.prisma.userCourse.findUnique({
      where: {
        id: userCourseId,
      },
    });

    if (!userCourse) {
      throw new Error('User course not found');
    }

    if (userCourse.pause_count >= 2) {
      throw new BadRequestException('Bạn đã đạt giới hạn số lần bảo lưu');
    }

    const maxTotalDays = 60;
    const remainingDays = maxTotalDays - (userCourse.total_paused_days || 0);
    if (remainingDays <= 0) {
      throw new BadRequestException('Bạn đã đạt giới hạn tổng số ngày (60 ngày) bảo lưu');
    }

    const now = new Date();
    const pauseUntil = new Date();
    pauseUntil.setDate(now.getDate() + remainingDays);

    // Update user course status to RESERVED
    const updatedCourse = await this.prisma.userCourse.update({
      where: {
        id: userCourseId,
      },
      data: {
        status: UserCourseStatus.RESERVED,
        paused_at: now,
        pause_until: pauseUntil,
        pause_count: (userCourse.pause_count ?? 0) + 1,
      },
      include: {
        course: true,
      },
    });

    return updatedCourse;
  }

  async cancelReserveCourse(userCourseId: string) {
    const userCourse = await this.prisma.userCourse.findUnique({
      where: {
        id: userCourseId,
      },
    });

    if (!userCourse) {
      throw new Error('User course not found');
    }

    if (userCourse.status !== UserCourseStatus.RESERVED) {
      throw new BadRequestException('Khóa học hiện không trong trạng thái bảo lưu');
    }

    const now = new Date();

    // Số ngày đã dùng trong lần bảo lưu này
    const pausedAt = new Date(userCourse.paused_at!);
    const daysUsedThisTime = Math.floor((now.getTime() - pausedAt.getTime()) / (1000 * 60 * 60 * 24));
    const safeDaysUsedThisTime = Math.max(0, daysUsedThisTime);

    // Tổng số ngày bảo lưu sau lần này, giới hạn 60 ngày
    const previousTotal = userCourse.total_paused_days ?? 0;
    const totalPausedDaysAfter = Math.min(previousTotal + safeDaysUsedThisTime, 60);

    // Số ngày thực tế được cộng vào expired_date trong lần này
    const daysToAdd = totalPausedDaysAfter - previousTotal; // chỉ cộng số ngày còn thiếu để đạt max 60

    const newExpiredDate = new Date(userCourse.expired_date!);
    newExpiredDate.setDate(newExpiredDate.getDate() + daysToAdd);

    const updatedCourse = await this.prisma.userCourse.update({
      where: {
        id: userCourseId,
      },
      data: {
        status: UserCourseStatus.ACTIVE,
        paused_at: null,
        pause_until: null,
        total_paused_days: totalPausedDaysAfter,
        expired_date: newExpiredDate,
      },
      include: {
        course: true,
      },
    });

    return updatedCourse;
  }

  private formatCourseData(course: any, type: 'favorite' | 'activated' | 'inactive', userCourse?: any, activeCode?: any) {
    const total_lessons = course.sections?.reduce((sum, section) => sum + (section.lessons?.length || 0), 0) || 0;
    const total_duration =
      course.sections?.reduce((sum, section) => {
        const sectionDuration = section.lessons?.reduce((s, lesson) => s + (lesson.minutes || 0), 0) || 0;
        return sum + sectionDuration;
      }, 0) || 0;

    // Xác định loại mua (đơn lẻ hay từ combo)
    const purchaseType = activeCode?.combo_id ? 'combo' : 'single';

    let remainingDays: number | null = null;
    let expiryWarning: 'notice' | null = null;

    if (userCourse?.expired_date) {
      const enroll = new Date(userCourse.enrolled_at);
      const expiry = new Date(userCourse.expired_date);
      const diff = expiry.getTime() - enroll.getTime();
      remainingDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (remainingDays > 0 && remainingDays <= 30) {
        expiryWarning = 'notice';
      }
    }

    return {
      course_id: course.course_id,
      course_name: course.course_name,
      course_description: course.course_description,
      course_price: course.course_price.toString(),
      course_original_price: course.course_original_price.toString(),
      src: course.thumbnail,
      created_at: course.created_at,
      state: course.state,
      // Thêm thông tin bổ sung
      total_lessons,
      total_duration,
      avg_rating: course.ratingSummary?.avg_rating || 0,
      total_reviews: course.ratingSummary?.total_reviews || 0,
      // Thông tin kích hoạt
      enrolled_at: userCourse?.enrolled_at,
      expired_date: userCourse?.expired_date,
      active_code: activeCode?.code,
      // Thông tin mua hàng
      purchase_type: purchaseType,
      combo_id: activeCode?.combo_id,

      remaining_days: remainingDays,
      expiry_warning: expiryWarning,
      // Phân loại
      type,
    };
  }
}
