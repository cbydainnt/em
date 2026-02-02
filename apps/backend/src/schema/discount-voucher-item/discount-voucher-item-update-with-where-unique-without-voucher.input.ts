import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUpdateWithoutVoucherInput } from './discount-voucher-item-update-without-voucher.input';

@InputType()
export class DiscountVoucherItemUpdateWithWhereUniqueWithoutVoucherInput {

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

    @Field(() => DiscountVoucherItemUpdateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherItemUpdateWithoutVoucherInput)
    data!: DiscountVoucherItemUpdateWithoutVoucherInput;
}
