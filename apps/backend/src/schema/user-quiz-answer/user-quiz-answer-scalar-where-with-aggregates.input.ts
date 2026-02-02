import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class UserQuizAnswerScalarWhereWithAggregatesInput {

    @Field(() => [UserQuizAnswerScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserQuizAnswerScalarWhereWithAggregatesInput>;

    @Field(() => [UserQuizAnswerScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserQuizAnswerScalarWhereWithAggregatesInput>;

    @Field(() => [UserQuizAnswerScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserQuizAnswerScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    progress_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    question_id?: StringWithAggregatesFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    selected_answer_ids?: StringNullableListFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    answer_text?: StringNullableWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    is_correct?: BoolWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    points_earned?: FloatWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    time_spent?: IntNullableWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    created_at?: DateTimeWithAggregatesFilter;
}
