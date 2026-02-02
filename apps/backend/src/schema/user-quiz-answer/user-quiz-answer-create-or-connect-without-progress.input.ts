import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerCreateWithoutProgressInput } from './user-quiz-answer-create-without-progress.input';

@InputType()
export class UserQuizAnswerCreateOrConnectWithoutProgressInput {

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => UserQuizAnswerCreateWithoutProgressInput, {nullable:false})
    @Type(() => UserQuizAnswerCreateWithoutProgressInput)
    create!: UserQuizAnswerCreateWithoutProgressInput;
}
