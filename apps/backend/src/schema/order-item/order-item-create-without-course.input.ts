import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderCreateNestedOneWithoutOrder_itemsInput } from '../order/order-create-nested-one-without-order-items.input';
import { ComboCreateNestedOneWithoutOrder_itemsInput } from '../combo/combo-create-nested-one-without-order-items.input';

@InputType()
export class OrderItemCreateWithoutCourseInput {

    @Field(() => String, {nullable:true})
    order_item_id?: string;

    @Field(() => Int, {nullable:true})
    item_type?: number;

    @Field(() => Int, {nullable:false})
    final_price!: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => OrderCreateNestedOneWithoutOrder_itemsInput, {nullable:false})
    order!: OrderCreateNestedOneWithoutOrder_itemsInput;

    @Field(() => ComboCreateNestedOneWithoutOrder_itemsInput, {nullable:true})
    combo?: ComboCreateNestedOneWithoutOrder_itemsInput;
}
