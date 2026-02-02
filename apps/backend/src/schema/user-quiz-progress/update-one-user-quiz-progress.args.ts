import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressUpdateInput } from './user-quiz-progress-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';

@ArgsType()
export class UpdateOneUserQuizProgressArgs {

    @Field(() => UserQuizProgressUpdateInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateInput)
    data!: UserQuizProgressUpdateInput;

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;
}
