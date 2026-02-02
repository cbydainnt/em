import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUpdateWithoutComboInput } from './discount-voucher-item-update-without-combo.input';
import { DiscountVoucherItemCreateWithoutComboInput } from './discount-voucher-item-create-without-combo.input';

@InputType()
export class DiscountVoucherItemUpsertWithWhereUniqueWithoutComboInput {

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

    @Field(() => DiscountVoucherItemUpdateWithoutComboInput, {nullable:false})
    @Type(() => DiscountVoucherItemUpdateWithoutComboInput)
    update!: DiscountVoucherItemUpdateWithoutComboInput;

    @Field(() => DiscountVoucherItemCreateWithoutComboInput, {nullable:false})
    @Type(() => DiscountVoucherItemCreateWithoutComboInput)
    create!: DiscountVoucherItemCreateWithoutComboInput;
}
