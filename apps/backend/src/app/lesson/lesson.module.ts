import { Module } from "@nestjs/common";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
@Module({
  imports: [],
  providers: [LessonService],
    exports: [LessonService],
    controllers: [LessonController],
})
export class LessonModule {}