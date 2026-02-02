import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class UserQuizAnswerScalarWhereInput {

    @Field(() => [UserQuizAnswerScalarWhereInput], {nullable:true})
    AND?: Array<UserQuizAnswerScalarWhereInput>;

    @Field(() => [UserQuizAnswerScalarWhereInput], {nullable:true})
    OR?: Array<UserQuizAnswerScalarWhereInput>;

    @Field(() => [UserQuizAnswerScalarWhereInput], {nullable:true})
    NOT?: Array<UserQuizAnswerScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    progress_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    question_id?: StringFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    selected_answer_ids?: StringNullableListFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    answer_text?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_correct?: BoolFilter;

    @Field(() => FloatFilter, {nullable:true})
    points_earned?: FloatFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    time_spent?: IntNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;
}
