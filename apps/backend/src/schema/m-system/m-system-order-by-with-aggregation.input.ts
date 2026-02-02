import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { MSystemCountOrderByAggregateInput } from './m-system-count-order-by-aggregate.input';
import { MSystemAvgOrderByAggregateInput } from './m-system-avg-order-by-aggregate.input';
import { MSystemMaxOrderByAggregateInput } from './m-system-max-order-by-aggregate.input';
import { MSystemMinOrderByAggregateInput } from './m-system-min-order-by-aggregate.input';
import { MSystemSumOrderByAggregateInput } from './m-system-sum-order-by-aggregate.input';

@InputType()
export class MSystemOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    param_key?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    param_no?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    param_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    param_value?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sort?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    create_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => MSystemCountOrderByAggregateInput, {nullable:true})
    _count?: MSystemCountOrderByAggregateInput;

    @Field(() => MSystemAvgOrderByAggregateInput, {nullable:true})
    _avg?: MSystemAvgOrderByAggregateInput;

    @Field(() => MSystemMaxOrderByAggregateInput, {nullable:true})
    _max?: MSystemMaxOrderByAggregateInput;

    @Field(() => MSystemMinOrderByAggregateInput, {nullable:true})
    _min?: MSystemMinOrderByAggregateInput;

    @Field(() => MSystemSumOrderByAggregateInput, {nullable:true})
    _sum?: MSystemSumOrderByAggregateInput;
}
