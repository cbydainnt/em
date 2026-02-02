import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsInt, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  created_by?: string;

  @IsOptional()
  @IsBoolean()
  del_flg?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}
