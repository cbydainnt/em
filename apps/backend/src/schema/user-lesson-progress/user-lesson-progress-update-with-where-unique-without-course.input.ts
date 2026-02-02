import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressUpdateWithoutCourseInput } from './user-lesson-progress-update-without-course.input';

@InputType()
export class UserLessonProgressUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressUpdateWithoutCourseInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateWithoutCourseInput)
    data!: UserLessonProgressUpdateWithoutCourseInput;
}
