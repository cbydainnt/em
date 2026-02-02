import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressUpdateWithoutLessonInput } from './user-lesson-progress-update-without-lesson.input';

@InputType()
export class UserLessonProgressUpdateWithWhereUniqueWithoutLessonInput {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressUpdateWithoutLessonInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateWithoutLessonInput)
    data!: UserLessonProgressUpdateWithoutLessonInput;
}
