import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateWithoutDiscount_vouchersInput } from './order-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { OrderCreateOrConnectWithoutDiscount_vouchersInput } from './order-create-or-connect-without-discount-vouchers.input';
import { OrderUpsertWithoutDiscount_vouchersInput } from './order-upsert-without-discount-vouchers.input';
import { OrderWhereInput } from './order-where.input';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { OrderUpdateToOneWithWhereWithoutDiscount_vouchersInput } from './order-update-to-one-with-where-without-discount-vouchers.input';

@InputType()
export class OrderUpdateOneWithoutDiscount_vouchersNestedInput {

    @Field(() => OrderCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderCreateWithoutDiscount_vouchersInput)
    create?: OrderCreateWithoutDiscount_vouchersInput;

    @Field(() => OrderCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: OrderCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => OrderUpsertWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderUpsertWithoutDiscount_vouchersInput)
    upsert?: OrderUpsertWithoutDiscount_vouchersInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    delete?: OrderWhereInput;

    @Field(() => OrderWhereUniqueInput, {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;

    @Field(() => OrderUpdateToOneWithWhereWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => OrderUpdateToOneWithWhereWithoutDiscount_vouchersInput)
    update?: OrderUpdateToOneWithWhereWithoutDiscount_vouchersInput;
}
