import { Controller, Get, Param, Post, UseGuards, Req, Body, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('course/:courseId/filter')
  async filterReviews(@Param('courseId') courseId: string, @Req() req) {
    const { query = '', rating } = req.query;
    return this.reviewService.filterAndSearchReviews(courseId, query as string, rating ? Number(rating) : undefined);
  }

  @Get('course/:courseId')
  async getCourseReviews(@Param('courseId') courseId: string) {
    return this.reviewService.getCourseReviews(courseId);
  }

  @Post('course/:courseId')
  @UseGuards(JwtAuthGuard)
  async createReview(@Param('courseId') courseId: string, @Req() req, @Body() body: { rating: number; comment?: string }) {
    return this.reviewService.createReview(courseId, req.user.id, body.rating, body.comment);
  }

  @Get('check-access/:courseId')
  @UseGuards(JwtAuthGuard)
  async checkCourseAccess(@Param('courseId') courseId: string, @Request() req: any) {
    const userId = req.user.id;
    const hasAccess = await this.reviewService.checkUserCourseAccess(userId, courseId);
    return { hasAccess };
  }
}
