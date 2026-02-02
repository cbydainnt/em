import { Controller, Get, Put, Body, Delete, Param } from '@nestjs/common';
import { AdminTeacherProfileService } from './admin-teacher-profile.service';
import { UpsertTeacherProfileDto } from './dto/upsert-teacher-profile.dto';

@Controller('admin/teacher-profile')
export class AdminTeacherProfileController {
  constructor(private readonly service: AdminTeacherProfileService) {}

  @Get()
  getProfile() {
    return this.service.getProfile();
  }

  @Put()
  saveProfile(@Body() body: UpsertTeacherProfileDto) {
    return this.service.upsertProfile(body);
  }

  @Delete('skill/:name')
  deleteSkill(@Param('name') name: string) {
    return this.service.deleteSkill(name);
  }
}
