import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutApplicable_itemsInput } from './discount-voucher-create-without-applicable-items.input';

@InputType()
export class DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherCreateWithoutApplicable_itemsInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutApplicable_itemsInput)
    create!: DiscountVoucherCreateWithoutApplicable_itemsInput;
}
