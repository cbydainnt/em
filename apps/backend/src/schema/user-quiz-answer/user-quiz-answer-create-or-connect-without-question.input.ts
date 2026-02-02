import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateWithoutQuestionInput } from './user-quiz-answer-create-without-question.input';

@InputType()
export class UserQuizAnswerCreateOrConnectWithoutQuestionInput {

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => UserQuizAnswerCreateWithoutQuestionInput, {nullable:false})
    @Type(() => UserQuizAnswerCreateWithoutQuestionInput)
    create!: UserQuizAnswerCreateWithoutQuestionInput;
}
