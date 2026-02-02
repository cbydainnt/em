import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateWithoutDiscount_vouchersInput } from './order-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { OrderCreateOrConnectWithoutDiscount_vouchersInput } from './order-create-or-connect-without-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';

@InputType()
export class OrderCreateNestedOneWithoutDiscount_vouchersInput {

    @Field(() => OrderCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderCreateWithoutDiscount_vouchersInput)
    create?: OrderCreateWithoutDiscount_vouchersInput;

    @Field(() => OrderCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: OrderCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => OrderWhereUniqueInput, {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;
}
