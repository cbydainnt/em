import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutOrderInput } from './discount-voucher-create-without-order.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutOrderInput } from './discount-voucher-create-or-connect-without-order.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';

@InputType()
export class DiscountVoucherCreateNestedOneWithoutOrderInput {

    @Field(() => DiscountVoucherCreateWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutOrderInput)
    create?: DiscountVoucherCreateWithoutOrderInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutOrderInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutOrderInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutOrderInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
