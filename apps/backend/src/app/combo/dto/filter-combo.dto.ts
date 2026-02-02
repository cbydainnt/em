import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class FilterComboDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;
}
