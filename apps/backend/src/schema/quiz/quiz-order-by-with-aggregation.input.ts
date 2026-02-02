import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { QuizCountOrderByAggregateInput } from './quiz-count-order-by-aggregate.input';
import { QuizAvgOrderByAggregateInput } from './quiz-avg-order-by-aggregate.input';
import { QuizMaxOrderByAggregateInput } from './quiz-max-order-by-aggregate.input';
import { QuizMinOrderByAggregateInput } from './quiz-min-order-by-aggregate.input';
import { QuizSumOrderByAggregateInput } from './quiz-sum-order-by-aggregate.input';

@InputType()
export class QuizOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_points?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passing_score?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    duration_minutes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty_level?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    version?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    parent_quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_latest_version?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    version_notes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    has_audio?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    show_explanation?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    randomize_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    randomize_answers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    allow_review?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    max_attempts?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    allow_retake?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    show_results?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => QuizCountOrderByAggregateInput, {nullable:true})
    _count?: QuizCountOrderByAggregateInput;

    @Field(() => QuizAvgOrderByAggregateInput, {nullable:true})
    _avg?: QuizAvgOrderByAggregateInput;

    @Field(() => QuizMaxOrderByAggregateInput, {nullable:true})
    _max?: QuizMaxOrderByAggregateInput;

    @Field(() => QuizMinOrderByAggregateInput, {nullable:true})
    _min?: QuizMinOrderByAggregateInput;

    @Field(() => QuizSumOrderByAggregateInput, {nullable:true})
    _sum?: QuizSumOrderByAggregateInput;
}
