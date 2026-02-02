import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressUpdateWithoutUserInput } from './user-lesson-progress-update-without-user.input';
import { UserLessonProgressCreateWithoutUserInput } from './user-lesson-progress-create-without-user.input';

@InputType()
export class UserLessonProgressUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateWithoutUserInput)
    update!: UserLessonProgressUpdateWithoutUserInput;

    @Field(() => UserLessonProgressCreateWithoutUserInput, {nullable:false})
    @Type(() => UserLessonProgressCreateWithoutUserInput)
    create!: UserLessonProgressCreateWithoutUserInput;
}
