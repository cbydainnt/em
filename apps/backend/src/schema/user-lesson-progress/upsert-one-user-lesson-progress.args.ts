import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateInput } from './user-lesson-progress-create.input';
import { UserLessonProgressUpdateInput } from './user-lesson-progress-update.input';

@ArgsType()
export class UpsertOneUserLessonProgressArgs {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressCreateInput, {nullable:false})
    @Type(() => UserLessonProgressCreateInput)
    create!: UserLessonProgressCreateInput;

    @Field(() => UserLessonProgressUpdateInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateInput)
    update!: UserLessonProgressUpdateInput;
}
