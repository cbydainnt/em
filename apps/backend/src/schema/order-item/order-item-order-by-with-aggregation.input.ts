import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { OrderItemCountOrderByAggregateInput } from './order-item-count-order-by-aggregate.input';
import { OrderItemAvgOrderByAggregateInput } from './order-item-avg-order-by-aggregate.input';
import { OrderItemMaxOrderByAggregateInput } from './order-item-max-order-by-aggregate.input';
import { OrderItemMinOrderByAggregateInput } from './order-item-min-order-by-aggregate.input';
import { OrderItemSumOrderByAggregateInput } from './order-item-sum-order-by-aggregate.input';

@InputType()
export class OrderItemOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    order_item_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    item_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    final_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => OrderItemCountOrderByAggregateInput, {nullable:true})
    _count?: OrderItemCountOrderByAggregateInput;

    @Field(() => OrderItemAvgOrderByAggregateInput, {nullable:true})
    _avg?: OrderItemAvgOrderByAggregateInput;

    @Field(() => OrderItemMaxOrderByAggregateInput, {nullable:true})
    _max?: OrderItemMaxOrderByAggregateInput;

    @Field(() => OrderItemMinOrderByAggregateInput, {nullable:true})
    _min?: OrderItemMinOrderByAggregateInput;

    @Field(() => OrderItemSumOrderByAggregateInput, {nullable:true})
    _sum?: OrderItemSumOrderByAggregateInput;
}
