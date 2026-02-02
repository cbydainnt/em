import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutOrderInput } from './discount-voucher-create-without-order.input';

@InputType()
export class DiscountVoucherCreateOrConnectWithoutOrderInput {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherCreateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutOrderInput)
    create!: DiscountVoucherCreateWithoutOrderInput;
}
