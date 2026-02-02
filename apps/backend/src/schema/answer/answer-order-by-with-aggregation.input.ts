import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { AnswerCountOrderByAggregateInput } from './answer-count-order-by-aggregate.input';
import { AnswerAvgOrderByAggregateInput } from './answer-avg-order-by-aggregate.input';
import { AnswerMaxOrderByAggregateInput } from './answer-max-order-by-aggregate.input';
import { AnswerMinOrderByAggregateInput } from './answer-min-order-by-aggregate.input';
import { AnswerSumOrderByAggregateInput } from './answer-sum-order-by-aggregate.input';

@InputType()
export class AnswerOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    answer_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_image?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_correct?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    match_key?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    blank_position?: keyof typeof SortOrder;

    @Field(() => AnswerCountOrderByAggregateInput, {nullable:true})
    _count?: AnswerCountOrderByAggregateInput;

    @Field(() => AnswerAvgOrderByAggregateInput, {nullable:true})
    _avg?: AnswerAvgOrderByAggregateInput;

    @Field(() => AnswerMaxOrderByAggregateInput, {nullable:true})
    _max?: AnswerMaxOrderByAggregateInput;

    @Field(() => AnswerMinOrderByAggregateInput, {nullable:true})
    _min?: AnswerMinOrderByAggregateInput;

    @Field(() => AnswerSumOrderByAggregateInput, {nullable:true})
    _sum?: AnswerSumOrderByAggregateInput;
}
