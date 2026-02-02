import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerCreateInput } from './user-quiz-answer-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUserQuizAnswerArgs {

    @Field(() => UserQuizAnswerCreateInput, {nullable:false})
    @Type(() => UserQuizAnswerCreateInput)
    data!: UserQuizAnswerCreateInput;
}
