import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemUpdateInput } from './discount-voucher-item-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';

@ArgsType()
export class UpdateOneDiscountVoucherItemArgs {

    @Field(() => DiscountVoucherItemUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherItemUpdateInput)
    data!: DiscountVoucherItemUpdateInput;

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;
}
