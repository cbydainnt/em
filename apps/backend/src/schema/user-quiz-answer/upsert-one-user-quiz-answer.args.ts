import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateInput } from './user-quiz-answer-create.input';
import { UserQuizAnswerUpdateInput } from './user-quiz-answer-update.input';

@ArgsType()
export class UpsertOneUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => UserQuizAnswerCreateInput, {nullable:false})
    @Type(() => UserQuizAnswerCreateInput)
    create!: UserQuizAnswerCreateInput;

    @Field(() => UserQuizAnswerUpdateInput, {nullable:false})
    @Type(() => UserQuizAnswerUpdateInput)
    update!: UserQuizAnswerUpdateInput;
}
