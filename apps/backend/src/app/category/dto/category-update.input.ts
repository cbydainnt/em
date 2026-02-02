import { IsOptional, IsBoolean, IsString, IsArray, IsInt, Min } from 'class-validator';

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

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class AddCombosDto {
  @IsArray()
  combo_ids: string[];
}
