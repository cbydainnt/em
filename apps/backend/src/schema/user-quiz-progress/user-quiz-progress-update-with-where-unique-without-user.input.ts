import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizProgressUpdateWithoutUserInput } from './user-quiz-progress-update-without-user.input';

@InputType()
export class UserQuizProgressUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateWithoutUserInput)
    data!: UserQuizProgressUpdateWithoutUserInput;
}
