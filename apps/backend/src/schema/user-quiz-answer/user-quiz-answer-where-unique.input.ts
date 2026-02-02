import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerProgress_idQuestion_idCompoundUniqueInput } from './user-quiz-answer-progress-id-question-id-compound-unique.input';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserQuizProgressRelationFilter } from '../user-quiz-progress/user-quiz-progress-relation-filter.input';
import { QuestionRelationFilter } from '../question/question-relation-filter.input';

@InputType()
export class UserQuizAnswerWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserQuizAnswerProgress_idQuestion_idCompoundUniqueInput, {nullable:true})
    progress_id_question_id?: UserQuizAnswerProgress_idQuestion_idCompoundUniqueInput;

    @Field(() => [UserQuizAnswerWhereInput], {nullable:true})
    AND?: Array<UserQuizAnswerWhereInput>;

    @Field(() => [UserQuizAnswerWhereInput], {nullable:true})
    OR?: Array<UserQuizAnswerWhereInput>;

    @Field(() => [UserQuizAnswerWhereInput], {nullable:true})
    NOT?: Array<UserQuizAnswerWhereInput>;

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

    @Field(() => UserQuizProgressRelationFilter, {nullable:true})
    progress?: UserQuizProgressRelationFilter;

    @Field(() => QuestionRelationFilter, {nullable:true})
    question?: QuestionRelationFilter;
}
