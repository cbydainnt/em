import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateInput } from './discount-voucher-item-create.input';
import { DiscountVoucherItemUpdateInput } from './discount-voucher-item-update.input';

@ArgsType()
export class UpsertOneDiscountVoucherItemArgs {

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

    @Field(() => DiscountVoucherItemCreateInput, {nullable:false})
    @Type(() => DiscountVoucherItemCreateInput)
    create!: DiscountVoucherItemCreateInput;

    @Field(() => DiscountVoucherItemUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherItemUpdateInput)
    update!: DiscountVoucherItemUpdateInput;
}
