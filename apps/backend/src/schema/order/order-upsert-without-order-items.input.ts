import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderUpdateWithoutOrder_itemsInput } from './order-update-without-order-items.input';
import { Type } from 'class-transformer';
import { OrderCreateWithoutOrder_itemsInput } from './order-create-without-order-items.input';
import { OrderWhereInput } from './order-where.input';

@InputType()
export class OrderUpsertWithoutOrder_itemsInput {

    @Field(() => OrderUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => OrderUpdateWithoutOrder_itemsInput)
    update!: OrderUpdateWithoutOrder_itemsInput;

    @Field(() => OrderCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => OrderCreateWithoutOrder_itemsInput)
    create!: OrderCreateWithoutOrder_itemsInput;

    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: OrderWhereInput;
}
