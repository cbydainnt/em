// src/courses/dto/update-course.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { BaseCourseDto } from './base-course.dto';

export class UpdateCourseDto extends PartialType(BaseCourseDto) {}
