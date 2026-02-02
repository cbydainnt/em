import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutUsed_byInput } from './discount-voucher-create-without-used-by.input';

@InputType()
export class DiscountVoucherCreateOrConnectWithoutUsed_byInput {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherCreateWithoutUsed_byInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutUsed_byInput)
    create!: DiscountVoucherCreateWithoutUsed_byInput;
}
