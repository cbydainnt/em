import { Body, Controller, Get, Post, Param, Query, BadRequestException } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { UpdateUserLessonProgressDto } from './dto/update-user-lesson-progress.dto';
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('LessonById/:lessonId')
  async getLessonById(@Param('lessonId') lessonId: string) {
    return await this.lessonService.findByLessonId(lessonId);
  }

  @Get('LessonBySlug/:slug')
  async getLessonBySlug(@Param('slug') slug: string) {
    const parts = slug.split('-');
    const lessonId = parts.pop();

    if (!lessonId) {
      throw new BadRequestException('Invalid lesson slug');
    }

    return await this.lessonService.findByLessonId(lessonId);
  }

  @Get('get-all-lesson-by-courseId/:courseId')
  async getAllLessonByCourseId(@Param('courseId') courseId: string) {
    return await this.lessonService.findAllLessonByCourseId(courseId);
  }

  @Get('user-lesson-progress')
  async getProgress(@Query('user_id') user_id: string, @Query('lesson_id') lesson_id: string, @Query('course_id') course_id: string) {
    return this.lessonService.findOneByUserLesson(user_id, lesson_id, course_id);
  }
  @Post('user-lesson-progress')
  update(@Body() dto: UpdateUserLessonProgressDto) {
    return this.lessonService.updateProgress(dto);
  }
  @Get('getStatus/:userId')
  async getUserStats(@Param('userId') userId: string) {
    const summary = await this.lessonService.getStatus(userId);
    const courses = await this.lessonService.getCourseProgress(userId);
    return { summary, courses };
  }
  @Get('detailed-progress/:courseId/:userId')
  async getDetailedProgress(@Param('courseId') courseId: string, @Param('userId') userId: string) {
    if (!courseId || !userId) {
      throw new BadRequestException('Course ID và User ID là bắt buộc');
    }

    return this.lessonService.getDetailedCourseProgress(userId, courseId);
  }
}
