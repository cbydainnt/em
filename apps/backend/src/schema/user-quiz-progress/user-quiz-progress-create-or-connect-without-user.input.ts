import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateWithoutUserInput } from './user-quiz-progress-create-without-user.input';

@InputType()
export class UserQuizProgressCreateOrConnectWithoutUserInput {

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressCreateWithoutUserInput, {nullable:false})
    @Type(() => UserQuizProgressCreateWithoutUserInput)
    create!: UserQuizProgressCreateWithoutUserInput;
}
