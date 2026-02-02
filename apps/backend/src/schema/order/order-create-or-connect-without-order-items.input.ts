import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { Type } from 'class-transformer';
import { OrderCreateWithoutOrder_itemsInput } from './order-create-without-order-items.input';

@InputType()
export class OrderCreateOrConnectWithoutOrder_itemsInput {

    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;

    @Field(() => OrderCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => OrderCreateWithoutOrder_itemsInput)
    create!: OrderCreateWithoutOrder_itemsInput;
}
