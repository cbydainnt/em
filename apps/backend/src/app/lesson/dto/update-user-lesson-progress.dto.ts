import { IsString, IsOptional, IsInt, Min, Max, IsDateString, IsArray } from 'class-validator';

export class UpdateUserLessonProgressDto {
  @IsString()
  user_id: string;

  @IsString()
  lesson_id: string;

  @IsString()
  course_id: string;

  @IsOptional()
  @IsArray()
  segments?: [number, number][];

  @IsOptional()
  @IsInt()
  @Min(0)
  watched_seconds?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2)
  completed?: number; // 1:INCOMPLETE, 2:COMPLETE

  @IsOptional()
  @IsDateString()
  last_accessed?: string;
}
