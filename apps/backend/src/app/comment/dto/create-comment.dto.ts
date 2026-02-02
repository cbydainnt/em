import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  user_type: string; // "user" | "teacher"

  @IsOptional()
  @IsString()
  parent_id?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  teacher_id?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  course_id?: string;

  @IsOptional()
  @IsString()
  lesson_id?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
