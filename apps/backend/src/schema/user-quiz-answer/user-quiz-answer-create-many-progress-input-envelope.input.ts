import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateManyProgressInput } from './user-quiz-answer-create-many-progress.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizAnswerCreateManyProgressInputEnvelope {

    @Field(() => [UserQuizAnswerCreateManyProgressInput], {nullable:false})
    @Type(() => UserQuizAnswerCreateManyProgressInput)
    data!: Array<UserQuizAnswerCreateManyProgressInput>;
}
