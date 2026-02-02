import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateWithoutQuizInput } from './user-quiz-progress-create-without-quiz.input';

@InputType()
export class UserQuizProgressCreateOrConnectWithoutQuizInput {

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressCreateWithoutQuizInput, {nullable:false})
    @Type(() => UserQuizProgressCreateWithoutQuizInput)
    create!: UserQuizProgressCreateWithoutQuizInput;
}
