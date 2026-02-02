import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerUpdateInput } from './user-quiz-answer-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';

@ArgsType()
export class UpdateOneUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerUpdateInput, {nullable:false})
    @Type(() => UserQuizAnswerUpdateInput)
    data!: UserQuizAnswerUpdateInput;

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;
}
