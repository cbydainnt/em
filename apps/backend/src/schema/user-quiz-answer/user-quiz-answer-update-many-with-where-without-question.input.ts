import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizAnswerScalarWhereInput } from './user-quiz-answer-scalar-where.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerUpdateManyMutationInput } from './user-quiz-answer-update-many-mutation.input';

@InputType()
export class UserQuizAnswerUpdateManyWithWhereWithoutQuestionInput {

    @Field(() => UserQuizAnswerScalarWhereInput, {nullable:false})
    @Type(() => UserQuizAnswerScalarWhereInput)
    where!: UserQuizAnswerScalarWhereInput;

    @Field(() => UserQuizAnswerUpdateManyMutationInput, {nullable:false})
    @Type(() => UserQuizAnswerUpdateManyMutationInput)
    data!: UserQuizAnswerUpdateManyMutationInput;
}
