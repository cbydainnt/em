import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';

@InputType()
export class AnswerScalarWhereInput {

    @Field(() => [AnswerScalarWhereInput], {nullable:true})
    AND?: Array<AnswerScalarWhereInput>;

    @Field(() => [AnswerScalarWhereInput], {nullable:true})
    OR?: Array<AnswerScalarWhereInput>;

    @Field(() => [AnswerScalarWhereInput], {nullable:true})
    NOT?: Array<AnswerScalarWhereInput>;

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
}
