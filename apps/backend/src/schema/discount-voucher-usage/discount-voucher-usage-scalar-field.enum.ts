import { registerEnumType } from '@nestjs/graphql';

export enum DiscountVoucherUsageScalarFieldEnum {
    voucher_usage_id = "voucher_usage_id",
    discount_voucher_id = "discount_voucher_id",
    user_id = "user_id",
    order_id = "order_id",
    used_at = "used_at"
}


registerEnumType(DiscountVoucherUsageScalarFieldEnum, { name: 'DiscountVoucherUsageScalarFieldEnum', description: undefined })
