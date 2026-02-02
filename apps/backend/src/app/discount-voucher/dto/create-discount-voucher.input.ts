export class CreateDiscountVoucherInput {
  code: string;
  discount_type: number;
  discount_value: number;
  min_order_amount?: number;
  applicable_type: number;
  user_scope: number;
  start_date: Date;
  end_date?: Date;
  usage_limit?: number;
  per_user_limit?: number;
  status: number;
  applicable_course_ids?: string[];
  applicable_combo_ids?: string[];
}
