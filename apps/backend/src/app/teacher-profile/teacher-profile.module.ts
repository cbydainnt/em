import { Module } from '@nestjs/common';
import { AdminTeacherProfileController } from './admin-teacher-profile.controller';
import { AdminTeacherProfileService } from './admin-teacher-profile.service';

@Module({
  controllers: [AdminTeacherProfileController],
  providers: [AdminTeacherProfileService],
})
export class TeacherProfileModule {}
