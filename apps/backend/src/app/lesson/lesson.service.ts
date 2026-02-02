import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserLessonProgressDto } from './dto/update-user-lesson-progress.dto';
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
export class LessonService {
  private readonly logger = new Logger(LessonService.name);

  async findByLessonId(lessonId: string) {
    try {
      return await prisma.lesson.findUnique({
        where: {
          lesson_id: lessonId,
        },
        include: {
          documents: true,
          section: {
            include: {
              course: true,
            },
          },
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async findAllLessonByCourseId(courseId: string) {
    try {
      const sections = await prisma.section.findMany({
        where: { course_id: courseId },
        orderBy: { created_at: 'asc' },
        include: {
          lessons: {
            select: {
              lesson_id: true,
              minutes: true,
            },
            orderBy: { lesson_order: 'asc' },
          },
        },
      });

      return sections;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }
  async findOneByUserLesson(user_id: string, lesson_id: string, course_id: string) {
    return prisma.userLessonProgress.findUnique({
      where: {
        user_id_lesson_id: {
          user_id,
          lesson_id,
        },
      },
      select: {
        watched_seconds: true,
        completed: true,
        segments: true,
        last_accessed: true,
      },
    });
  }
  async updateProgress(dto: UpdateUserLessonProgressDto) {
    const { user_id, lesson_id, course_id, ...data } = dto;

    return prisma.userLessonProgress.upsert({
      where: {
        user_id_lesson_id: {
          user_id,
          lesson_id,
        },
      },
      update: {
        ...data,
        updated_at: new Date(),
      },
      create: {
        user_id,
        lesson_id,
        course_id,
        ...data,
      },
    });
  }

  async getStatus(userId: string) {
    const [totalWatched, lessonsCompleted, lessonsStarted, totalLessons] = await Promise.all([
      prisma.userLessonProgress.aggregate({
        _sum: { watched_seconds: true },
        where: { user_id: userId },
      }),
      prisma.userLessonProgress.count({
        where: { user_id: userId, completed: 2 },
      }),
      prisma.userLessonProgress.count({
        where: { user_id: userId },
      }),
      prisma.lesson.count(),
    ]);

    const totalSeconds = totalWatched._sum.watched_seconds || 0;
    //const courseCount = distinctCourses.length;
    const activeCourses = await prisma.userCourse.findMany({
      where: {
        user_id: userId,
        status: UserCourseStatus.ACTIVE,
        del_flg: false,
      },
      select: {
        course_id: true,
      },
    });

    const activeCourseIds = activeCourses.map((c) => c.course_id);
    if (activeCourseIds.length === 0) {
      return [];
    }

    const percentCompleted = lessonsStarted > 0 ? (lessonsCompleted / lessonsStarted) * 100 : 0;

    return {
      totalWatchedSeconds: totalSeconds,
      totalLessonsStarted: lessonsStarted,
      totalLessonsCompleted: lessonsCompleted,
      totalLessonsInSystem: totalLessons,
      totalCoursesJoined: activeCourses.length,
      percentCompleted: Math.round(percentCompleted * 100) / 100,
    };
  }
  async getCourseProgress(userId: string) {
    const activeCourses = await prisma.userCourse.findMany({
      where: {
        user_id: userId,
        status: UserCourseStatus.ACTIVE,
        del_flg: false,
      },
      select: {
        course_id: true,
      },
    });

    const activeCourseIds = activeCourses.map((c) => c.course_id);
    if (activeCourseIds.length === 0) {
      return [];
    }

    //get course in usercourse (enroll course)
    const progressList = await prisma.userLessonProgress.findMany({
      where: { user_id: userId, course_id: { in: activeCourseIds } },
      include: {
        course: true,
      },
    });

    // Gom theo khóa học
    const courseMap = new Map<
      string,
      {
        courseId: string;
        courseName: string;
        totalWatched: number;
        completed: number;
        totalLessons: number;
      }
    >();

    for (const p of progressList) {
      const courseId = p.course_id;

      if (!courseMap.has(courseId)) {
        const totalVideoLessons = await prisma.lesson.count({
          where: {
            lesson_type: 0,
            del_flg: false,
            section: {
              course_id: courseId,
              del_flg: false,
            },
          },
        });

        courseMap.set(courseId, {
          courseId,
          courseName: p.course.course_name,
          totalWatched: 0,
          completed: 0,
          totalLessons: totalVideoLessons,
        });
      }

      const data = courseMap.get(courseId)!;
      data.totalWatched += p.watched_seconds ?? 0;
      if (p.completed === 2) data.completed += 1;
    }

    return Array.from(courseMap.values()).map((c) => ({
      courseId: c.courseId,
      courseName: c.courseName,
      totalWatchedSeconds: c.totalWatched,
      completedLessons: c.completed,
      totalLessons: c.totalLessons,
    }));
  }

  async getDetailedCourseProgress(userId: string, courseId: string) {
    try {
      // 1. Kiểm tra user có quyền truy cập course không
      const userCourse = await prisma.userCourse.findFirst({
        where: {
          user_id: userId,
          course_id: courseId,
          status: UserCourseStatus.ACTIVE,
          del_flg: false,
        },
      });

      if (!userCourse) {
        return {
          success: true,
          overall: {
            course_id: courseId,
            user_id: userId,
            total_lessons: 0,
            completed_lessons: 0,
            total_watched_seconds: 0,
            total_duration_seconds: 0,
            overall_progress_percentage: 0,
            overall_completion_percentage: 0,
            enrolled_at: null,
            expired_date: null,
            remaining_days: null,
          },
          sections: [],
        };
      }

      // 2. Lấy tất cả lessons của course
      const sections = await prisma.section.findMany({
        where: {
          course_id: courseId,
          del_flg: false,
        },
        include: {
          lessons: {
            where: { del_flg: false },
            orderBy: { lesson_order: 'asc' },
            select: {
              lesson_id: true,
              lesson_title: true,
              lesson_type: true,
              minutes: true,
              access_type: true,
              lesson_order: true,
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });

      // 3. Lấy progress của user cho tất cả lessons trong course
      const userProgress = await prisma.userLessonProgress.findMany({
        where: {
          user_id: userId,
          course_id: courseId,
        },
      });

      // 4. Tạo map để truy cập nhanh - đảm bảo convert ID sang string
      const progressMap = new Map(
        userProgress.map((p) => [
          p.lesson_id.toString(), // Convert ObjectId sang string nếu cần
          p,
        ]),
      );

      // 5. Tính toán tiến độ
      let totalWatchedSeconds = 0;
      let totalCompletedLessons = 0;
      let totalLessons = 0;

      const sectionsWithProgress = sections.map((section) => {
        const sectionLessons = section.lessons.map((lesson) => {
          totalLessons++;

          // Đảm bảo lesson_id là string để so sánh
          const lessonIdStr = lesson.lesson_id.toString();
          const progress = progressMap.get(lessonIdStr);

          const watchedSeconds = progress?.watched_seconds ? Number(progress.watched_seconds) : 0;
          const completed = progress?.completed === 2;

          if (completed) totalCompletedLessons++;
          totalWatchedSeconds += watchedSeconds;

          return {
            lesson_id: lessonIdStr,
            lesson_title: lesson.lesson_title,
            lesson_type: Number(lesson.lesson_type),
            minutes: Number(lesson.minutes),
            access_type: Number(lesson.access_type),
            lesson_order: Number(lesson.lesson_order),
            watched_seconds: watchedSeconds,
            completed,
            last_accessed: progress?.last_accessed,
            progress_percentage: lesson.minutes > 0 ? Math.min(100, (watchedSeconds / (Number(lesson.minutes) * 60)) * 100) : 0,
          };
        });

        const sectionWatchedSeconds = sectionLessons.reduce((sum, lesson) => sum + lesson.watched_seconds, 0);
        const sectionCompletedLessons = sectionLessons.filter((l) => l.completed).length;
        const sectionTotalMinutes = sectionLessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
        const sectionTotalSeconds = sectionTotalMinutes * 60;

        return {
          section_id: section.section_id.toString(), // Convert sang string
          section_title: section.section_title,
          lessons: sectionLessons,
          stats: {
            total_lessons: sectionLessons.length,
            completed_lessons: sectionCompletedLessons,
            total_watched_seconds: sectionWatchedSeconds,
            total_duration_seconds: sectionTotalSeconds,
            progress_percentage: sectionTotalSeconds > 0 ? (sectionWatchedSeconds / sectionTotalSeconds) * 100 : 0,
            completion_percentage: sectionLessons.length > 0 ? (sectionCompletedLessons / sectionLessons.length) * 100 : 0,
          },
        };
      });

      // 6. Tính toán tổng quan course
      const courseTotalMinutes = sectionsWithProgress.reduce((sum, section) => sum + section.lessons.reduce((s, lesson) => s + lesson.minutes, 0), 0);
      const courseTotalSeconds = courseTotalMinutes * 60;

      const overallProgress = {
        course_id: courseId,
        user_id: userId,
        total_lessons: totalLessons,
        completed_lessons: totalCompletedLessons,
        total_watched_seconds: totalWatchedSeconds,
        total_duration_seconds: courseTotalSeconds,
        overall_progress_percentage: courseTotalSeconds > 0 ? (totalWatchedSeconds / courseTotalSeconds) * 100 : 0,
        overall_completion_percentage: totalLessons > 0 ? (totalCompletedLessons / totalLessons) * 100 : 0,
        enrolled_at: userCourse.enrolled_at,
        expired_date: userCourse.expired_date,
        remaining_days: userCourse.expired_date ? Math.ceil((new Date(userCourse.expired_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null,
      };

      return {
        success: true,
        overall: overallProgress,
        sections: sectionsWithProgress,
      };
    } catch (error: any) {
      this.logger.error(`Error getting detailed course progress: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
