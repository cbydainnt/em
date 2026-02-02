import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { QuizRelationFilter } from '../quiz/quiz-relation-filter.input';
import { QuestionListRelationFilter } from '../question/question-list-relation-filter.input';

@InputType()
export class QuizAudioWhereUniqueInput {

    @Field(() => String, {nullable:true})
    audio_id?: string;

    @Field(() => [QuizAudioWhereInput], {nullable:true})
    AND?: Array<QuizAudioWhereInput>;

    @Field(() => [QuizAudioWhereInput], {nullable:true})
    OR?: Array<QuizAudioWhereInput>;

    @Field(() => [QuizAudioWhereInput], {nullable:true})
    NOT?: Array<QuizAudioWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    quiz_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    title?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    audio_url?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    file_name?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    duration_seconds?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    transcript?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    total_questions?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    question_ordering?: JsonNullableFilter;

    @Field(() => QuizRelationFilter, {nullable:true})
    quiz?: QuizRelationFilter;

    @Field(() => QuestionListRelationFilter, {nullable:true})
    questions?: QuestionListRelationFilter;
}
