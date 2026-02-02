import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ActiveCodeCountOrderByAggregateInput } from './active-code-count-order-by-aggregate.input';
import { ActiveCodeAvgOrderByAggregateInput } from './active-code-avg-order-by-aggregate.input';
import { ActiveCodeMaxOrderByAggregateInput } from './active-code-max-order-by-aggregate.input';
import { ActiveCodeMinOrderByAggregateInput } from './active-code-min-order-by-aggregate.input';
import { ActiveCodeSumOrderByAggregateInput } from './active-code-sum-order-by-aggregate.input';

@InputType()
export class ActiveCodeOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    active_code_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order_item_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    customer_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    item_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    used_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expires_at?: keyof typeof SortOrder;

    @Field(() => ActiveCodeCountOrderByAggregateInput, {nullable:true})
    _count?: ActiveCodeCountOrderByAggregateInput;

    @Field(() => ActiveCodeAvgOrderByAggregateInput, {nullable:true})
    _avg?: ActiveCodeAvgOrderByAggregateInput;

    @Field(() => ActiveCodeMaxOrderByAggregateInput, {nullable:true})
    _max?: ActiveCodeMaxOrderByAggregateInput;

    @Field(() => ActiveCodeMinOrderByAggregateInput, {nullable:true})
    _min?: ActiveCodeMinOrderByAggregateInput;

    @Field(() => ActiveCodeSumOrderByAggregateInput, {nullable:true})
    _sum?: ActiveCodeSumOrderByAggregateInput;
}
