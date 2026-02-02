import { registerEnumType } from '@nestjs/graphql';

export enum OrderScalarFieldEnum {
    order_id = "order_id",
    user_id = "user_id",
    total_price = "total_price",
    status = "status",
    payment_method = "payment_method",
    created_at = "created_at",
    updated_at = "updated_at",
    discount_voucher_id = "discount_voucher_id"
}


registerEnumType(OrderScalarFieldEnum, { name: 'OrderScalarFieldEnum', description: undefined })
