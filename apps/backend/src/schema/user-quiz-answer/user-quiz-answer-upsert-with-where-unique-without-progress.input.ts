import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerUpdateWithoutProgressInput } from './user-quiz-answer-update-without-progress.input';
import { UserQuizAnswerCreateWithoutProgressInput } from './user-quiz-answer-create-without-progress.input';

@InputType()
export class UserQuizAnswerUpsertWithWhereUniqueWithoutProgressInput {

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizAnswerWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => UserQuizAnswerUpdateWithoutProgressInput, {nullable:false})
    @Type(() => UserQuizAnswerUpdateWithoutProgressInput)
    update!: UserQuizAnswerUpdateWithoutProgressInput;

    @Field(() => UserQuizAnswerCreateWithoutProgressInput, {nullable:false})
    @Type(() => UserQuizAnswerCreateWithoutProgressInput)
    create!: UserQuizAnswerCreateWithoutProgressInput;
}
