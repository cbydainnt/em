import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizProgressUpdateWithoutQuizInput } from './user-quiz-progress-update-without-quiz.input';

@InputType()
export class UserQuizProgressUpdateWithWhereUniqueWithoutQuizInput {

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressUpdateWithoutQuizInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateWithoutQuizInput)
    data!: UserQuizProgressUpdateWithoutQuizInput;
}
