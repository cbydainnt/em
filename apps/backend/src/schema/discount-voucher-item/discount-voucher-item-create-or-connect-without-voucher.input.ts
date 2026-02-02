import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateWithoutVoucherInput } from './discount-voucher-item-create-without-voucher.input';

@InputType()
export class DiscountVoucherItemCreateOrConnectWithoutVoucherInput {

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

    @Field(() => DiscountVoucherItemCreateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherItemCreateWithoutVoucherInput)
    create!: DiscountVoucherItemCreateWithoutVoucherInput;
}
