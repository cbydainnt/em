import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { OrderCountOrderByAggregateInput } from './order-count-order-by-aggregate.input';
import { OrderAvgOrderByAggregateInput } from './order-avg-order-by-aggregate.input';
import { OrderMaxOrderByAggregateInput } from './order-max-order-by-aggregate.input';
import { OrderMinOrderByAggregateInput } from './order-min-order-by-aggregate.input';
import { OrderSumOrderByAggregateInput } from './order-sum-order-by-aggregate.input';

@InputType()
export class OrderOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    order_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    payment_method?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => OrderCountOrderByAggregateInput, {nullable:true})
    _count?: OrderCountOrderByAggregateInput;

    @Field(() => OrderAvgOrderByAggregateInput, {nullable:true})
    _avg?: OrderAvgOrderByAggregateInput;

    @Field(() => OrderMaxOrderByAggregateInput, {nullable:true})
    _max?: OrderMaxOrderByAggregateInput;

    @Field(() => OrderMinOrderByAggregateInput, {nullable:true})
    _min?: OrderMinOrderByAggregateInput;

    @Field(() => OrderSumOrderByAggregateInput, {nullable:true})
    _sum?: OrderSumOrderByAggregateInput;
}
