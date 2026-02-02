import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserQuizAnswerCountOrderByAggregateInput } from './user-quiz-answer-count-order-by-aggregate.input';
import { UserQuizAnswerAvgOrderByAggregateInput } from './user-quiz-answer-avg-order-by-aggregate.input';
import { UserQuizAnswerMaxOrderByAggregateInput } from './user-quiz-answer-max-order-by-aggregate.input';
import { UserQuizAnswerMinOrderByAggregateInput } from './user-quiz-answer-min-order-by-aggregate.input';
import { UserQuizAnswerSumOrderByAggregateInput } from './user-quiz-answer-sum-order-by-aggregate.input';

@InputType()
export class UserQuizAnswerOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    progress_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    selected_answer_ids?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_correct?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    points_earned?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    time_spent?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => UserQuizAnswerCountOrderByAggregateInput, {nullable:true})
    _count?: UserQuizAnswerCountOrderByAggregateInput;

    @Field(() => UserQuizAnswerAvgOrderByAggregateInput, {nullable:true})
    _avg?: UserQuizAnswerAvgOrderByAggregateInput;

    @Field(() => UserQuizAnswerMaxOrderByAggregateInput, {nullable:true})
    _max?: UserQuizAnswerMaxOrderByAggregateInput;

    @Field(() => UserQuizAnswerMinOrderByAggregateInput, {nullable:true})
    _min?: UserQuizAnswerMinOrderByAggregateInput;

    @Field(() => UserQuizAnswerSumOrderByAggregateInput, {nullable:true})
    _sum?: UserQuizAnswerSumOrderByAggregateInput;
}
