import { registerEnumType } from '@nestjs/graphql';

export enum DiscountVoucherUserScalarFieldEnum {
    id = "id",
    discount_voucher_id = "discount_voucher_id",
    user_id = "user_id"
}


registerEnumType(DiscountVoucherUserScalarFieldEnum, { name: 'DiscountVoucherUserScalarFieldEnum', description: undefined })
