import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CategoryComboCountOrderByAggregateInput } from './category-combo-count-order-by-aggregate.input';
import { CategoryComboMaxOrderByAggregateInput } from './category-combo-max-order-by-aggregate.input';
import { CategoryComboMinOrderByAggregateInput } from './category-combo-min-order-by-aggregate.input';

@InputType()
export class CategoryComboOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => CategoryComboCountOrderByAggregateInput, {nullable:true})
    _count?: CategoryComboCountOrderByAggregateInput;

    @Field(() => CategoryComboMaxOrderByAggregateInput, {nullable:true})
    _max?: CategoryComboMaxOrderByAggregateInput;

    @Field(() => CategoryComboMinOrderByAggregateInput, {nullable:true})
    _min?: CategoryComboMinOrderByAggregateInput;
}
