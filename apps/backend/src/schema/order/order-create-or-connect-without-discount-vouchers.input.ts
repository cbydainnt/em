import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { Type } from 'class-transformer';
import { OrderCreateWithoutDiscount_vouchersInput } from './order-create-without-discount-vouchers.input';

@InputType()
export class OrderCreateOrConnectWithoutDiscount_vouchersInput {

    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;

    @Field(() => OrderCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => OrderCreateWithoutDiscount_vouchersInput)
    create!: OrderCreateWithoutDiscount_vouchersInput;
}
