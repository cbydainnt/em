import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    @Type(() => UserQuizAnswerWhereInput)
    where?: UserQuizAnswerWhereInput;
}
