import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

import { UserCoursesService } from './user_courses.service';
import { GetCourseStudentsDto } from './dto/get-course-students.dto';

@Controller('usercourses')
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Get(':courseId/students')
  async getCourseStudents(@Param('courseId') courseId: string, @Query() query: GetCourseStudentsDto) {
    return this.userCoursesService.getCourseStudents(courseId, query);
  }
  @Get(':courseId/students/:userId')
  async getStudentDetail(@Param('courseId') courseId: string, @Param('userId') userId: string) {
    return this.userCoursesService.getStudentDetail(courseId, userId);
  }
}
