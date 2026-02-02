import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateWithoutOrder_itemsInput } from './order-create-without-order-items.input';
import { Type } from 'class-transformer';
import { OrderCreateOrConnectWithoutOrder_itemsInput } from './order-create-or-connect-without-order-items.input';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';

@InputType()
export class OrderCreateNestedOneWithoutOrder_itemsInput {

    @Field(() => OrderCreateWithoutOrder_itemsInput, {nullable:true})
    @Type(() => OrderCreateWithoutOrder_itemsInput)
    create?: OrderCreateWithoutOrder_itemsInput;

    @Field(() => OrderCreateOrConnectWithoutOrder_itemsInput, {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutOrder_itemsInput)
    connectOrCreate?: OrderCreateOrConnectWithoutOrder_itemsInput;

    @Field(() => OrderWhereUniqueInput, {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;
}
