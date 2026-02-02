import { registerEnumType } from '@nestjs/graphql';

export enum DiscountVoucherItemScalarFieldEnum {
    id = "id",
    discount_voucher_id = "discount_voucher_id",
    course_id = "course_id",
    combo_id = "combo_id"
}


registerEnumType(DiscountVoucherItemScalarFieldEnum, { name: 'DiscountVoucherItemScalarFieldEnum', description: undefined })
