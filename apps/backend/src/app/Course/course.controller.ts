import { Controller, Get, Param, Query, Logger, Res, UseGuards, Post, Body, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import type { Response } from 'express';
import { SearchCourseDto } from './dto/search-course.dto';
import { ConfigService } from '@nestjs/config';
import { MinIOService } from '../minio/minio.service';
import { join } from 'path';

import { OptionalJwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';

@Controller('course')
export class CourseController {
  private outputPath: string = '';
  private readonly logger = new Logger(CourseController.name);
  private readonly minIOService = new MinIOService(this.configService);
  constructor(
    private readonly courseService: CourseService,
    private readonly configService: ConfigService,
  ) {
    this.outputPath = this.configService.get('OUTPUT_PATH') ?? join(process.cwd(), '../../');
  }

  @Get('search')
  @UseGuards(OptionalJwtAuthGuard)
  async searchCourse(@Query() query: SearchCourseDto, @Req() req) {
    const userId = req.user?.id;
    return this.courseService.searchCourse(query, userId);
  }

  @Get('with-combo/:combo_id')
  async getCoursesByCombo(@Param('combo_id') combo_id: string) {
    return this.courseService.getCoursesByCombo(combo_id);
  }

  @Get('sections/:course_id')
  async getSections(@Param('course_id') course_id: string) {
    return this.courseService.getSectionsWithLessons(course_id);
  }
  @Get(':course_id')
  async getCourseById(@Param('course_id') course_id: string) {
    return this.courseService.findByCourseId(course_id);
  }
  @Get(':course_id/view-count')
  async getViewCount(@Param('course_id') course_id: string) {
    return this.courseService.findViewCount(course_id);
  }
  @Post(':course_id/view')
  @UseGuards(OptionalJwtAuthGuard)
  async recordView(@Param('course_id') course_id: string, @Req() req) {
    return this.courseService.recordCourseView(course_id, req.user?.id, req.headers['user-agent']);
  }

  @Get()
  async getAllCourses() {
    return this.courseService.findAll();
  }

  @Get('my-courses/:user_id')
  async getUserCourses(@Param('user_id') user_id: string) {
    return this.courseService.getUserCourses(user_id);
  }

  @Get('get-reserve-courses/:user_id')
  async getAllUserCourse(@Param('user_id') user_id: string) {
    return this.courseService.getAllUserCourse(user_id);
  }

  @Post('reserve-course')
  async reserveCourse(@Body() body: { userCourseId: string }) {
    return this.courseService.reserveCourse(body.userCourseId);
  }

  @Post('cancel-reserve-course')
  async cancelReserveCourse(@Body() body: { userCourseId: string }) {
    return this.courseService.cancelReserveCourse(body.userCourseId);
  }

  @Get('file/:bucket/*')
  async viewFile(@Param('bucket') bucket: string, @Param() params, @Res() res: Response) {
    const key = params['0'];
    try {
      const stream = await this.minIOService.getFileStream(bucket, key);
      stream.getStream().pipe(res);
    } catch (err) {
      console.log('Err View file MinIO: ', bucket + '/' + key);
      res.status(404).send('File not found');
    }
  }
}
