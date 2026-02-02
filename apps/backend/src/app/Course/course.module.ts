import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { UserModule } from '../user/user.module';
import { AdminCoursesController } from './admin-course.controller';
import { MinIOService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { AdminCourseService } from './admin-course.service';

@Module({
  imports: [UserModule],
  providers: [CourseService, AdminCourseService, MinIOService, ConfigService],
  exports: [CourseService, AdminCourseService],
  controllers: [CourseController, AdminCoursesController],
})
export class CourseModule {}
