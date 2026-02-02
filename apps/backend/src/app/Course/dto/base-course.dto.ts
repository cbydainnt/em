import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

class BaseLessonDto {
  @IsString()
  @IsOptional()
  lesson_id?: string;

  @IsString()
  lesson_title: string;

  @IsInt()
  @IsOptional()
  lesson_type?: number = 1; // Default to 1

  @IsString()
  @IsOptional()
  lesson_video?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  @IsOptional()
  documents?: DocumentDto[];

  @IsInt()
  @Min(0)
  @IsOptional()
  minutes?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  lesson_order?: number;

  @IsInt()
  @IsOptional()
  access_type?: number = 3; // 1: free, 3: paid (default)
}

class BaseSectionDto {
  @IsString()
  @IsOptional()
  section_id?: string;

  @IsString()
  section_title: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  section_order?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseLessonDto)
  @IsOptional()
  lessons?: BaseLessonDto[];
}

class DocumentDto {
  @IsString()
  @IsOptional()
  document_id?: string;

  @IsString()
  document_name: string;

  @IsString()
  @IsOptional()
  document_url?: string;

  @IsString()
  @IsOptional()
  document_url_key?: string;

  @IsString()
  @IsOptional()
  extension?: string;

  @IsInt()
  @IsOptional()
  size?: number;

  @IsBoolean()
  @IsOptional()
  isDownloadable?: boolean; // ✨ Field mới cho phép tải xuống

  @IsBoolean()
  @IsOptional()
  _deleted?: boolean;
}

export class BaseCourseDto {
  @IsString()
  course_name: string;

  @IsString()
  course_description: string;

  @IsString()
  course_target: string;

  @IsInt()
  @Min(0)
  course_price: number;
  @IsInt()
  @Min(0)
  view_count: number;

  @IsInt()
  @Min(0)
  course_original_price: number;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsBoolean()
  @IsOptional()
  del_flg?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseSectionDto)
  @IsOptional()
  sections?: BaseSectionDto[];
}
