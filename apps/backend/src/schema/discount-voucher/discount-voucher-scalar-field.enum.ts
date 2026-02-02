import { registerEnumType } from '@nestjs/graphql';

export enum DiscountVoucherScalarFieldEnum {
    discount_voucher_id = "discount_voucher_id",
    code = "code",
    discount_type = "discount_type",
    discount_value = "discount_value",
    min_order_amount = "min_order_amount",
    applicable_type = "applicable_type",
    user_scope = "user_scope",
    start_date = "start_date",
    end_date = "end_date",
    usage_limit = "usage_limit",
    used_count = "used_count",
    per_user_limit = "per_user_limit",
    status = "status",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(DiscountVoucherScalarFieldEnum, { name: 'DiscountVoucherScalarFieldEnum', description: undefined })
