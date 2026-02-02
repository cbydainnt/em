import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateManyUserInput } from './user-quiz-progress-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizProgressCreateManyUserInputEnvelope {

    @Field(() => [UserQuizProgressCreateManyUserInput], {nullable:false})
    @Type(() => UserQuizProgressCreateManyUserInput)
    data!: Array<UserQuizProgressCreateManyUserInput>;
}
