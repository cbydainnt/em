import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { QuizOrderByWithRelationInput } from '../quiz/quiz-order-by-with-relation.input';
import { QuizAudioOrderByWithRelationInput } from '../quiz-audio/quiz-audio-order-by-with-relation.input';
import { AnswerOrderByRelationAggregateInput } from '../answer/answer-order-by-relation-aggregate.input';
import { UserQuizAnswerOrderByRelationAggregateInput } from '../user-quiz-answer/user-quiz-answer-order-by-relation-aggregate.input';
import { ReadingPassageOrderByWithRelationInput } from '../reading-passage/reading-passage-order-by-with-relation.input';

@InputType()
export class QuestionOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_image?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    points?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    explanation?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    reading_passage_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => QuizOrderByWithRelationInput, {nullable:true})
    quiz?: QuizOrderByWithRelationInput;

    @Field(() => QuizAudioOrderByWithRelationInput, {nullable:true})
    audio?: QuizAudioOrderByWithRelationInput;

    @Field(() => AnswerOrderByRelationAggregateInput, {nullable:true})
    answers?: AnswerOrderByRelationAggregateInput;

    @Field(() => UserQuizAnswerOrderByRelationAggregateInput, {nullable:true})
    user_answers?: UserQuizAnswerOrderByRelationAggregateInput;

    @Field(() => ReadingPassageOrderByWithRelationInput, {nullable:true})
    reading_passage?: ReadingPassageOrderByWithRelationInput;
}
