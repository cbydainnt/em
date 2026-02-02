import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutUser_lesson_progressInput } from './course-create-without-user-lesson-progress.input';

@InputType()
export class CourseCreateOrConnectWithoutUser_lesson_progressInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => CourseCreateWithoutUser_lesson_progressInput)
    create!: CourseCreateWithoutUser_lesson_progressInput;
}
