// src/dto/create-combo.dto.ts
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min, IsNotEmpty } from 'class-validator';

export class CreateComboDto {
  @IsString()
  @IsNotEmpty()
  combo_name: string;

  @IsNumber()
  @Min(0)
  original_price: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  del_flg?: boolean;

  @IsArray()
  @IsOptional()
  courses?: string[];

  @IsString()
  @IsOptional()
  created_by?: string;

  @IsString()
  @IsOptional()
  updated_by?: string;
}