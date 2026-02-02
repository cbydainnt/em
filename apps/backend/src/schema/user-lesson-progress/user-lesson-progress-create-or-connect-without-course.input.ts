import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Type } from 'class-transformer';
import { UserLessonProgressCreateWithoutCourseInput } from './user-lesson-progress-create-without-course.input';

@InputType()
export class UserLessonProgressCreateOrConnectWithoutCourseInput {

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:false})
    @Type(() => UserLessonProgressWhereUniqueInput)
    where!: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => UserLessonProgressCreateWithoutCourseInput, {nullable:false})
    @Type(() => UserLessonProgressCreateWithoutCourseInput)
    create!: UserLessonProgressCreateWithoutCourseInput;
}
