import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartItemDto {
  //@IsNotEmpty()
  @IsString()
  user_id: string;

  //@IsNotEmpty()
  @IsString()
  course_id?: string;
}
