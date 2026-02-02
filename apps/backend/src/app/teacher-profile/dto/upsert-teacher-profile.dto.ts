import { IsOptional, IsString } from 'class-validator';

export class UpsertTeacherProfileDto {
  @IsOptional()
  @IsString()
  teacherName?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  ielts?: string;

  @IsOptional()
  @IsString()
  toeic?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  achievements?: string;
}
