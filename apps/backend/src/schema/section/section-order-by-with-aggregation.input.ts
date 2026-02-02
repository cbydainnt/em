import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SectionCountOrderByAggregateInput } from './section-count-order-by-aggregate.input';
import { SectionMaxOrderByAggregateInput } from './section-max-order-by-aggregate.input';
import { SectionMinOrderByAggregateInput } from './section-min-order-by-aggregate.input';

@InputType()
export class SectionOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    section_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    section_title?: keyof typeof SortOrder;

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
    course_id?: keyof typeof SortOrder;

    @Field(() => SectionCountOrderByAggregateInput, {nullable:true})
    _count?: SectionCountOrderByAggregateInput;

    @Field(() => SectionMaxOrderByAggregateInput, {nullable:true})
    _max?: SectionMaxOrderByAggregateInput;

    @Field(() => SectionMinOrderByAggregateInput, {nullable:true})
    _min?: SectionMinOrderByAggregateInput;
}
