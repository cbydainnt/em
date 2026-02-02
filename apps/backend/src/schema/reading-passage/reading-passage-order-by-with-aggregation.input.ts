import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ReadingPassageCountOrderByAggregateInput } from './reading-passage-count-order-by-aggregate.input';
import { ReadingPassageAvgOrderByAggregateInput } from './reading-passage-avg-order-by-aggregate.input';
import { ReadingPassageMaxOrderByAggregateInput } from './reading-passage-max-order-by-aggregate.input';
import { ReadingPassageMinOrderByAggregateInput } from './reading-passage-min-order-by-aggregate.input';
import { ReadingPassageSumOrderByAggregateInput } from './reading-passage-sum-order-by-aggregate.input';

@InputType()
export class ReadingPassageOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    reading_passage_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    content?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    tags?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_ordering?: keyof typeof SortOrder;

    @Field(() => ReadingPassageCountOrderByAggregateInput, {nullable:true})
    _count?: ReadingPassageCountOrderByAggregateInput;

    @Field(() => ReadingPassageAvgOrderByAggregateInput, {nullable:true})
    _avg?: ReadingPassageAvgOrderByAggregateInput;

    @Field(() => ReadingPassageMaxOrderByAggregateInput, {nullable:true})
    _max?: ReadingPassageMaxOrderByAggregateInput;

    @Field(() => ReadingPassageMinOrderByAggregateInput, {nullable:true})
    _min?: ReadingPassageMinOrderByAggregateInput;

    @Field(() => ReadingPassageSumOrderByAggregateInput, {nullable:true})
    _sum?: ReadingPassageSumOrderByAggregateInput;
}
