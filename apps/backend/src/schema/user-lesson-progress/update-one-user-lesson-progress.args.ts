import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressUpdateInput } from './user-lesson-progress-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';

@ArgsType()
export class UpdateOneUserLessonProgressArgs {

    @Field(() => UserLessonProgressUpdateInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateInput)
    data!: UserLessonProgressUpdateInput;

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;
}
