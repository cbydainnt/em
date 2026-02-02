import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerCreateManyInput } from './user-quiz-answer-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUserQuizAnswerArgs {

    @Field(() => [UserQuizAnswerCreateManyInput], {nullable:false})
    @Type(() => UserQuizAnswerCreateManyInput)
    data!: Array<UserQuizAnswerCreateManyInput>;
}
