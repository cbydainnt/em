import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressCreateManyInput } from './user-quiz-progress-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUserQuizProgressArgs {

    @Field(() => [UserQuizProgressCreateManyInput], {nullable:false})
    @Type(() => UserQuizProgressCreateManyInput)
    data!: Array<UserQuizProgressCreateManyInput>;
}
