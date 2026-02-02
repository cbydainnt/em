import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { QuestionRelationFilter } from '../question/question-relation-filter.input';

@InputType()
export class AnswerWhereInput {

    @Field(() => [AnswerWhereInput], {nullable:true})
    AND?: Array<AnswerWhereInput>;

    @Field(() => [AnswerWhereInput], {nullable:true})
    OR?: Array<AnswerWhereInput>;

    @Field(() => [AnswerWhereInput], {nullable:true})
    NOT?: Array<AnswerWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    answer_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    question_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    answer_text?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    answer_image?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_correct?: BoolFilter;

    @Field(() => IntFilter, {nullable:true})
    order?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    match_key?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    blank_position?: IntNullableFilter;

    @Field(() => QuestionRelationFilter, {nullable:true})
    question?: QuestionRelationFilter;
}
