import { Module } from "@nestjs/common";
import { UserCoursesController } from "./user_courses.controller";
import { UserCoursesService } from "./user_courses.service";

@Module({
  imports: [],
  providers: [UserCoursesService],
  exports: [UserCoursesService],
  controllers: [UserCoursesController],
})
export class UserCoursesModule {}