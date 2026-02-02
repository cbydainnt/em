import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerUpdateManyMutationInput } from './user-quiz-answer-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';

@ArgsType()
export class UpdateManyUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerUpdateManyMutationInput, {nullable:false})
    @Type(() => UserQuizAnswerUpdateManyMutationInput)
    data!: UserQuizAnswerUpdateManyMutationInput;

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    @Type(() => UserQuizAnswerWhereInput)
    where?: UserQuizAnswerWhereInput;
}
