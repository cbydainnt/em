import { IsString } from 'class-validator';

export class CreateActiveCodeDto {
  // @IsString()
  // combo_id:string;

  @IsString()
  user_id: string;

  @IsString()
  order_id: string;
  
  @IsString()
  active_code_status: string;
}