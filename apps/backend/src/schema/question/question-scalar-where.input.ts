import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class QuestionScalarWhereInput {

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    AND?: Array<QuestionScalarWhereInput>;

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    OR?: Array<QuestionScalarWhereInput>;

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    NOT?: Array<QuestionScalarWhereInput>;

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
}
