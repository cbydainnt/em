import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  lesson_id: string;

  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @IsString()
  @IsOptional()
  background_color?: string;
}

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  background_color?: string;
}
