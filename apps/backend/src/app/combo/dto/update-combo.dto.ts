import { PartialType } from '@nestjs/mapped-types';
import { CreateComboDto } from './create-combo.dto';
import { IsOptional, IsArray } from 'class-validator';

export class UpdateComboDto extends PartialType(CreateComboDto) {
  @IsArray()
  @IsOptional()
  courses?: string[];
}