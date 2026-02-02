import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserQuizProgressCountOrderByAggregateInput } from './user-quiz-progress-count-order-by-aggregate.input';
import { UserQuizProgressAvgOrderByAggregateInput } from './user-quiz-progress-avg-order-by-aggregate.input';
import { UserQuizProgressMaxOrderByAggregateInput } from './user-quiz-progress-max-order-by-aggregate.input';
import { UserQuizProgressMinOrderByAggregateInput } from './user-quiz-progress-min-order-by-aggregate.input';
import { UserQuizProgressSumOrderByAggregateInput } from './user-quiz-progress-sum-order-by-aggregate.input';

@InputType()
export class UserQuizProgressOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    progress_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    score?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    percentage?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    correct_answers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    time_spent?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    started_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    completed_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    attempts?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => UserQuizProgressCountOrderByAggregateInput, {nullable:true})
    _count?: UserQuizProgressCountOrderByAggregateInput;

    @Field(() => UserQuizProgressAvgOrderByAggregateInput, {nullable:true})
    _avg?: UserQuizProgressAvgOrderByAggregateInput;

    @Field(() => UserQuizProgressMaxOrderByAggregateInput, {nullable:true})
    _max?: UserQuizProgressMaxOrderByAggregateInput;

    @Field(() => UserQuizProgressMinOrderByAggregateInput, {nullable:true})
    _min?: UserQuizProgressMinOrderByAggregateInput;

    @Field(() => UserQuizProgressSumOrderByAggregateInput, {nullable:true})
    _sum?: UserQuizProgressSumOrderByAggregateInput;
}
