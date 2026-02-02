import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ComboCountOrderByAggregateInput } from './combo-count-order-by-aggregate.input';
import { ComboAvgOrderByAggregateInput } from './combo-avg-order-by-aggregate.input';
import { ComboMaxOrderByAggregateInput } from './combo-max-order-by-aggregate.input';
import { ComboMinOrderByAggregateInput } from './combo-min-order-by-aggregate.input';
import { ComboSumOrderByAggregateInput } from './combo-sum-order-by-aggregate.input';

@InputType()
export class ComboOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => ComboCountOrderByAggregateInput, {nullable:true})
    _count?: ComboCountOrderByAggregateInput;

    @Field(() => ComboAvgOrderByAggregateInput, {nullable:true})
    _avg?: ComboAvgOrderByAggregateInput;

    @Field(() => ComboMaxOrderByAggregateInput, {nullable:true})
    _max?: ComboMaxOrderByAggregateInput;

    @Field(() => ComboMinOrderByAggregateInput, {nullable:true})
    _min?: ComboMinOrderByAggregateInput;

    @Field(() => ComboSumOrderByAggregateInput, {nullable:true})
    _sum?: ComboSumOrderByAggregateInput;
}
