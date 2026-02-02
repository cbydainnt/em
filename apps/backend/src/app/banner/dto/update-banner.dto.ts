import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { TitleSegmentDto } from './title-segment.dto';

export class DescriptionConfigDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  font_size?: number;

  @IsOptional()
  @IsString()
  font_family?: string;
}

export class FloatingConfigDto {
  @IsOptional()
  @IsString()
  src?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  animation_type?: string;
}

export class UpdateBannerDto {
  @IsOptional()
  @IsString()
  background_css?: string;

  @IsOptional()
  @IsUrl()
  main_image_src?: string;

  @IsOptional()
  @IsUrl()
  main_floating_image_src?: string;

  @IsOptional()
  @IsUrl()
  title_decor_image_src?: string;

  @IsOptional()
  @IsUrl()
  button_decor_image_src?: string;

  @IsOptional()
  @IsBoolean()
  show_action_button?: boolean;

  @IsOptional()
  @IsString()
  action_button_text?: string;

  @IsOptional()
  @IsString()
  action_button_link?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TitleSegmentDto)
  title_segments?: TitleSegmentDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DescriptionConfigDto)
  description_config?: DescriptionConfigDto;

  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @Type(() => FloatingConfigDto)
  main_floating_image_config?: FloatingConfigDto;
}
