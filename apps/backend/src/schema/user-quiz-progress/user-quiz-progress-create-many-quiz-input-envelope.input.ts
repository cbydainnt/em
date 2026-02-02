import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressCreateManyQuizInput } from './user-quiz-progress-create-many-quiz.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizProgressCreateManyQuizInputEnvelope {

    @Field(() => [UserQuizProgressCreateManyQuizInput], {nullable:false})
    @Type(() => UserQuizProgressCreateManyQuizInput)
    data!: Array<UserQuizProgressCreateManyQuizInput>;
}
