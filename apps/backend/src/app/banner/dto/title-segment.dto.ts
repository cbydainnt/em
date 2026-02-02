import { IsNumber, IsOptional, IsString } from "class-validator";

export class TitleSegmentDto {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  font_size?: number;

  @IsOptional()
  @IsNumber()
  font_weight?: number;

  @IsOptional()
  @IsString()
  font_family?: string;
}