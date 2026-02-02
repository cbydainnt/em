import { Injectable, Logger, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActiveCodeStatus, UserCourseStatus, ActiveCodeType } from '@/enums/enum';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);
  private readonly prisma = new PrismaClient();

  async getCourseReviews(courseId: string) {
    const reviews = await this.prisma.courseReview.findMany({
      where: { course_id: courseId },
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { updated_at: 'desc' },
    });

    const summary = await this.prisma.ratingSummary.findUnique({
      where: { course_id: courseId },
    });
    return {
      average: summary?.avg_rating || 0,
      total_reviews: summary?.total_reviews || 0,
      rating_counts: {
        1: summary?.rating_1_count || 0,
        2: summary?.rating_2_count || 0,
        3: summary?.rating_3_count || 0,
        4: summary?.rating_4_count || 0,
        5: summary?.rating_5_count || 0,
      },
      reviews,
    };
  }

  async createReview(courseId: string, userId: string, rating: number, comment?: string) {
    // 1️⃣ Kiểm tra user có đang học khóa học này không
    const isEnrolled = await this.prisma.userCourse.findFirst({
      where: {
        user_id: userId,
        course_id: courseId,
        status: UserCourseStatus.ACTIVE,
        del_flg: false,
      },
    });

    if (!isEnrolled) {
      throw new ForbiddenException('Bạn cần học khóa học này trước khi đánh giá');
    }

    // 2️⃣ Kiểm tra user đã đánh giá chưa (chỉ cho phép 1 đánh giá)
    const existingReview = await this.prisma.courseReview.findUnique({
      where: {
        course_id_user_id: {
          course_id: courseId,
          user_id: userId,
        },
      },
    });

    // Nếu đã có đánh giá, chỉ cho phép cập nhật
    if (existingReview) {
      await this.prisma.courseReview.update({
        where: {
          course_id_user_id: {
            course_id: courseId,
            user_id: userId,
          },
        },
        data: {
          rating,
          comment: comment,
          updated_at: new Date(),
        },
      });
    } else {
      // Nếu chưa có đánh giá, tạo mới
      await this.prisma.courseReview.create({
        data: {
          course_id: courseId,
          user_id: userId,
          rating,
          comment: comment,
        },
      });
    }

    // 3️⃣ Cập nhật RatingSummary
    await this.updateRatingSummary(courseId);

    return {
      message: existingReview ? 'Cập nhật đánh giá thành công' : 'Đánh giá thành công',
    };
  }

  /**
   * Kiểm tra user có quyền truy cập khóa học không
   * - Hoặc có user_course với status = ACTIVE
   */
  async checkUserCourseAccess(userId: string, courseId: string): Promise<boolean> {
    const userCourse = await this.prisma.userCourse.findFirst({
      where: {
        user_id: userId,
        course_id: courseId,
        status: UserCourseStatus.ACTIVE, // ACTIVE
        del_flg: false,
      },
    });

    return !!userCourse;
  }

  private async updateRatingSummary(courseId: string) {
    const reviews = await this.prisma.courseReview.findMany({
      where: { course_id: courseId },
    });
    const total = reviews.length;

    const counts = [1, 2, 3, 4, 5].map((r) => reviews.filter((v) => v.rating === r).length);

    const avg = total === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    await this.prisma.ratingSummary.upsert({
      where: { course_id: courseId },
      create: {
        course_id: courseId,
        avg_rating: avg,
        total_reviews: total,
        rating_1_count: counts[0],
        rating_2_count: counts[1],
        rating_3_count: counts[2],
        rating_4_count: counts[3],
        rating_5_count: counts[4],
      },
      update: {
        avg_rating: avg,
        total_reviews: total,
        rating_1_count: counts[0],
        rating_2_count: counts[1],
        rating_3_count: counts[2],
        rating_4_count: counts[3],
        rating_5_count: counts[4],
        updated_at: new Date(),
      },
    });
  }

  async filterAndSearchReviews(courseId: string, query: string, rating?: number) {
    const where: any = { course_id: courseId };

    if (rating) {
      where.rating = rating;
    }

    if (query && query.trim() !== '') {
      where.comment = { contains: query.trim(), mode: 'insensitive' };
    }

    const reviews = await this.prisma.courseReview.findMany({
      where,
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { updated_at: 'desc' },
    });

    const summary = await this.prisma.ratingSummary.findUnique({
      where: { course_id: courseId },
    });

    return {
      average: summary?.avg_rating || 0,
      total_reviews: summary?.total_reviews || 0,
      rating_counts: {
        1: summary?.rating_1_count || 0,
        2: summary?.rating_2_count || 0,
        3: summary?.rating_3_count || 0,
        4: summary?.rating_4_count || 0,
        5: summary?.rating_5_count || 0,
      },
      reviews,
    };
  }
}
