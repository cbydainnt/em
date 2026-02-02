import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class GetCourseStudentsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  status?: string; // query param → convert sang number

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}

// dto/get-student-detail.dto.ts
export interface StudentDetailResponse {
  student: any;
  statistics: any;
  modules: any[];
  activities: any[];
}

