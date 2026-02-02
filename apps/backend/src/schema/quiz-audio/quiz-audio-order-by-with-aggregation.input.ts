import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { QuizAudioCountOrderByAggregateInput } from './quiz-audio-count-order-by-aggregate.input';
import { QuizAudioAvgOrderByAggregateInput } from './quiz-audio-avg-order-by-aggregate.input';
import { QuizAudioMaxOrderByAggregateInput } from './quiz-audio-max-order-by-aggregate.input';
import { QuizAudioMinOrderByAggregateInput } from './quiz-audio-min-order-by-aggregate.input';
import { QuizAudioSumOrderByAggregateInput } from './quiz-audio-sum-order-by-aggregate.input';

@InputType()
export class QuizAudioOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    audio_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_url?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    file_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    duration_seconds?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    transcript?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_ordering?: keyof typeof SortOrder;

    @Field(() => QuizAudioCountOrderByAggregateInput, {nullable:true})
    _count?: QuizAudioCountOrderByAggregateInput;

    @Field(() => QuizAudioAvgOrderByAggregateInput, {nullable:true})
    _avg?: QuizAudioAvgOrderByAggregateInput;

    @Field(() => QuizAudioMaxOrderByAggregateInput, {nullable:true})
    _max?: QuizAudioMaxOrderByAggregateInput;

    @Field(() => QuizAudioMinOrderByAggregateInput, {nullable:true})
    _min?: QuizAudioMinOrderByAggregateInput;

    @Field(() => QuizAudioSumOrderByAggregateInput, {nullable:true})
    _sum?: QuizAudioSumOrderByAggregateInput;
}
