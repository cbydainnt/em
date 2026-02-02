import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CartItemCountOrderByAggregateInput } from './cart-item-count-order-by-aggregate.input';
import { CartItemMaxOrderByAggregateInput } from './cart-item-max-order-by-aggregate.input';
import { CartItemMinOrderByAggregateInput } from './cart-item-min-order-by-aggregate.input';

@InputType()
export class CartItemOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    cart_item_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    added_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    selected?: keyof typeof SortOrder;

    @Field(() => CartItemCountOrderByAggregateInput, {nullable:true})
    _count?: CartItemCountOrderByAggregateInput;

    @Field(() => CartItemMaxOrderByAggregateInput, {nullable:true})
    _max?: CartItemMaxOrderByAggregateInput;

    @Field(() => CartItemMinOrderByAggregateInput, {nullable:true})
    _min?: CartItemMinOrderByAggregateInput;
}
