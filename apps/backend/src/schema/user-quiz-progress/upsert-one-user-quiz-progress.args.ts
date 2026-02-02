import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserQuizProgressCreateInput } from './user-quiz-progress-create.input';
import { UserQuizProgressUpdateInput } from './user-quiz-progress-update.input';

@ArgsType()
export class UpsertOneUserQuizProgressArgs {

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserQuizProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => UserQuizProgressCreateInput, {nullable:false})
    @Type(() => UserQuizProgressCreateInput)
    create!: UserQuizProgressCreateInput;

    @Field(() => UserQuizProgressUpdateInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateInput)
    update!: UserQuizProgressUpdateInput;
}
