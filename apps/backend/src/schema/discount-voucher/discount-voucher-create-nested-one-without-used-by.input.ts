import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutUsed_byInput } from './discount-voucher-create-without-used-by.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutUsed_byInput } from './discount-voucher-create-or-connect-without-used-by.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';

@InputType()
export class DiscountVoucherCreateNestedOneWithoutUsed_byInput {

    @Field(() => DiscountVoucherCreateWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutUsed_byInput)
    create?: DiscountVoucherCreateWithoutUsed_byInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutUsed_byInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutUsed_byInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutUsed_byInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
