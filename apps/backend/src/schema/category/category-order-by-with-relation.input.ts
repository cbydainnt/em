import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CategoryComboOrderByRelationAggregateInput } from '../category-combo/category-combo-order-by-relation-aggregate.input';

@InputType()
export class CategoryOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    category_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sort_order?: keyof typeof SortOrder;

    @Field(() => CategoryComboOrderByRelationAggregateInput, {nullable:true})
    combos?: CategoryComboOrderByRelationAggregateInput;
}
