import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerCreateManyQuestionInput } from './user-quiz-answer-create-many-question.input';
import { Type } from 'class-transformer';

@InputType()
export class UserQuizAnswerCreateManyQuestionInputEnvelope {

    @Field(() => [UserQuizAnswerCreateManyQuestionInput], {nullable:false})
    @Type(() => UserQuizAnswerCreateManyQuestionInput)
    data!: Array<UserQuizAnswerCreateManyQuestionInput>;
}
