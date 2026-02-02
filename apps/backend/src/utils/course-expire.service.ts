import { NotificationsService } from '@/app/notifications/notifications.service';
import { NotificationType, UserType } from '@/enums/enum';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { UserCourseStatus } from '@/enums/enum';
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
export class CourseExpireService {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async handleCron() {
    const now = new Date();
    console.log('⏳ CRON: Checking expired courses...', now);

    const expired = await prisma.userCourse.findMany({
      where: {
        expired_date: { lte: now },
        status: 1,
      },
      include: {
        course: {
          select: {
            course_name: true,
          },
        },
      },
    });

    for (const course of expired) {
      let title = '';
      let message = '';
      const enroll = new Date(course.enrolled_at);
      const expiry = new Date(course.expired_date);
      const diff = expiry.getTime() - enroll.getTime();
      const remaining_days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      switch (remaining_days) {
        case 30:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course.course_name}" sẽ hết hạn trong 30 ngày.`;
          break;
        case 7:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course.course_name}" sẽ hết hạn trong 7 ngày. Hãy hoàn thành sớm!`;
          break;
        case 3:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course.course_name}" sẽ hết hạn trong 3 ngày. Thời gian không còn nhiều!`;
          break;
        case 2:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course.course_name}" sẽ hết hạn trong 2 ngày. Hãy nhanh chóng hoàn thành!`;
          break;
        case 1:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course.course_name}" sẽ hết hạn vào NGÀY MAI!`;
          break;
        case 0:
          title = 'Khóa học đã hết hạn';
          message = `Khóa học "${course.course.course_name}" đã HẾT HẠN. Bạn không thể truy cập nội dung nữa.`;
          break;
      }
      if (title !== '') await this.notificationsService.logAction(title, message, course.user_id, course.course_id, UserType.USER, course.course_id, NotificationType.REMINDER, 'Cron Job');
    }

    console.log(`🔒 Done: ${expired.length} courses expired.`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  // @Cron('* * * * *')
  async autoCompleteReservedCourses() {
    const now = new Date();
    console.log('⏳ CRON: Checking reserved courses to auto-complete...', now);
    // Get all course expired and status = Reserved
    const expiredCourses = await prisma.userCourse.findMany({
      where: {
        status: UserCourseStatus.RESERVED,
        pause_until: { lte: now },
      },
      include: {
        user: true,
        course: true,
      },
    });

    for (const course of expiredCourses) {
      const pausedAt = new Date(course.paused_at!);
      const pauseUntil = new Date(course.pause_until!);
      const daysUsed = Math.floor((pauseUntil.getTime() - pausedAt.getTime()) / (1000 * 60 * 60 * 24));
      const totalPausedDays = (course.total_paused_days ?? 0) + daysUsed;
      const allowedPausedDays = Math.min(totalPausedDays, 60);

      // Cập nhật ngày hết hạn của khóa học
      const currentExpiredDate = new Date(course.expired_date!);
      const remainingDaysToAdd = Math.max(0, 60 - course.total_paused_days!);
      const newExpiredDate = new Date(currentExpiredDate);
      newExpiredDate.setDate(newExpiredDate.getDate() + remainingDaysToAdd);

      // Update status usercourse
      const updatedUserCourse = await prisma.userCourse.update({
        where: { id: course.id },
        data: {
          status: UserCourseStatus.ACTIVE,
          paused_at: null,
          pause_until: null,
          total_paused_days: allowedPausedDays,
          expired_date: newExpiredDate,
        },
        include: {
          course: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      await this.notificationsService.logAction('Bảo lưu hoàn tất', `Thời hạn bảo lưu khóa học "${updatedUserCourse.course.course_name}" đã kết thúc. Quay lại học nào ${updatedUserCourse.user.name} ơi!`, updatedUserCourse.user_id, UserType.USER, updatedUserCourse.course_id, updatedUserCourse.course_id, NotificationType.NOTICE, 'Cron Job');
    }
  }
}
