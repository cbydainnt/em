import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { QuizNullableRelationFilter } from '../quiz/quiz-nullable-relation-filter.input';
import { QuizAudioNullableRelationFilter } from '../quiz-audio/quiz-audio-nullable-relation-filter.input';
import { AnswerListRelationFilter } from '../answer/answer-list-relation-filter.input';
import { UserQuizAnswerListRelationFilter } from '../user-quiz-answer/user-quiz-answer-list-relation-filter.input';
import { ReadingPassageNullableRelationFilter } from '../reading-passage/reading-passage-nullable-relation-filter.input';

@InputType()
export class QuestionWhereInput {

    @Field(() => [QuestionWhereInput], {nullable:true})
    AND?: Array<QuestionWhereInput>;

    @Field(() => [QuestionWhereInput], {nullable:true})
    OR?: Array<QuestionWhereInput>;

    @Field(() => [QuestionWhereInput], {nullable:true})
    NOT?: Array<QuestionWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    question_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    quiz_id?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    question_text?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    question_image?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    question_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    order?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    points?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    difficulty?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    explanation?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    audio_id?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    audio_order?: IntNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    reading_passage_id?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => QuizNullableRelationFilter, {nullable:true})
    quiz?: QuizNullableRelationFilter;

    @Field(() => QuizAudioNullableRelationFilter, {nullable:true})
    audio?: QuizAudioNullableRelationFilter;

    @Field(() => AnswerListRelationFilter, {nullable:true})
    answers?: AnswerListRelationFilter;

    @Field(() => UserQuizAnswerListRelationFilter, {nullable:true})
    user_answers?: UserQuizAnswerListRelationFilter;

    @Field(() => ReadingPassageNullableRelationFilter, {nullable:true})
    reading_passage?: ReadingPassageNullableRelationFilter;
}
