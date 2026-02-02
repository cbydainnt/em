import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderWhereInput } from './order-where.input';
import { Type } from 'class-transformer';
import { OrderUpdateWithoutOrder_itemsInput } from './order-update-without-order-items.input';

@InputType()
export class OrderUpdateToOneWithWhereWithoutOrder_itemsInput {

    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: OrderWhereInput;

    @Field(() => OrderUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => OrderUpdateWithoutOrder_itemsInput)
    data!: OrderUpdateWithoutOrder_itemsInput;
}
