// report/dto/create-report.dto.ts
import { ReportCategory, ReportPriority, ReportType } from '@/enums/enum';
import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, Min, Max } from 'class-validator';


export class CreateReportDto {
  @IsOptional()
  @IsString()
  course_id?: string;

  @IsOptional()
  @IsString()
  lesson_id?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  report_type: ReportType;

  @IsNumber()
  @Min(1)
  @Max(15)
  category: ReportCategory;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  screenshot_urls?: string[];

  @IsOptional()
  @IsBoolean()
  is_anonymous?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_contact?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4)
  priority?: ReportPriority;
}

export class UpdateReportStatusDto {
  @IsNumber()
  @Min(1)
  @Max(4)
  status: number;

  @IsOptional()
  @IsString()
  resolution_notes?: string;
}

export class AddReportCommentDto {
  @IsString()
  content: string;
}