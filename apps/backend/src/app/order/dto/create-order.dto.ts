import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateOrderItemDto {
  @IsString()
  course_id?: string;

  @IsString()
  combo_id?: string;

  @IsInt()
  final_price: number;

  @IsInt()
  item_type: number; // 1 = combo, 2 = course
}

export class CreateOrderDto {
  @IsString()
  combo_id: string;

  @IsString()
  user_id: string;

  @IsInt()
  total_price: number;

  @IsString()
  payment_method: string;

  @IsArray()
  items: string[];
}

export class UpdateOrderDto {
  @IsString()
  status: string;
}

export class CheckOrderDto {
  @IsArray()
  @IsString({ each: true })
  keys: string[]; // list course | course | combo

  @IsNumber()
  @IsInt() // 1 = Course, 2 = Combo
  type: number;
  
  @IsString()
  user_id: string;
}
