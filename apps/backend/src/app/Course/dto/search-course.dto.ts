import { PurchaseStatus } from '@/enums/enum';
import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class SearchCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: string;

  @IsOptional()
  @IsNumberString()
  maxPrice?: string;

  @IsOptional()
  @IsString()
  comboId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsIn(['created_at', 'course_price', 'avg_rate_star', 'total_course_user'])
  sortBy?: 'created_at' | 'course_price' | 'avg_rate_star' | 'total_course_user';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  
  status?: PurchaseStatus;
}
