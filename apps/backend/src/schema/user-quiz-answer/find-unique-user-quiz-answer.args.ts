import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;
}
