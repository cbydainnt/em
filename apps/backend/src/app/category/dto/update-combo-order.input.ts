import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  updated_by?: string;

  @IsOptional()
  @IsBoolean()
  del_flg?: boolean;
}
