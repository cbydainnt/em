import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageWhereInput } from './reading-passage-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { QuestionListRelationFilter } from '../question/question-list-relation-filter.input';

@InputType()
export class ReadingPassageWhereUniqueInput {

    @Field(() => String, {nullable:true})
    reading_passage_id?: string;

    @Field(() => [ReadingPassageWhereInput], {nullable:true})
    AND?: Array<ReadingPassageWhereInput>;

    @Field(() => [ReadingPassageWhereInput], {nullable:true})
    OR?: Array<ReadingPassageWhereInput>;

    @Field(() => [ReadingPassageWhereInput], {nullable:true})
    NOT?: Array<ReadingPassageWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    title?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    difficulty?: IntFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    tags?: StringNullableListFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    total_questions?: IntFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    question_ordering?: JsonNullableFilter;

    @Field(() => QuestionListRelationFilter, {nullable:true})
    questions?: QuestionListRelationFilter;
}
