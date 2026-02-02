import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { LessonQuizCountOrderByAggregateInput } from './lesson-quiz-count-order-by-aggregate.input';
import { LessonQuizAvgOrderByAggregateInput } from './lesson-quiz-avg-order-by-aggregate.input';
import { LessonQuizMaxOrderByAggregateInput } from './lesson-quiz-max-order-by-aggregate.input';
import { LessonQuizMinOrderByAggregateInput } from './lesson-quiz-min-order-by-aggregate.input';
import { LessonQuizSumOrderByAggregateInput } from './lesson-quiz-sum-order-by-aggregate.input';

@InputType()
export class LessonQuizOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => LessonQuizCountOrderByAggregateInput, {nullable:true})
    _count?: LessonQuizCountOrderByAggregateInput;

    @Field(() => LessonQuizAvgOrderByAggregateInput, {nullable:true})
    _avg?: LessonQuizAvgOrderByAggregateInput;

    @Field(() => LessonQuizMaxOrderByAggregateInput, {nullable:true})
    _max?: LessonQuizMaxOrderByAggregateInput;

    @Field(() => LessonQuizMinOrderByAggregateInput, {nullable:true})
    _min?: LessonQuizMinOrderByAggregateInput;

    @Field(() => LessonQuizSumOrderByAggregateInput, {nullable:true})
    _sum?: LessonQuizSumOrderByAggregateInput;
}
