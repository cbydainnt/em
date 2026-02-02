import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_lesson_progressInput } from './course-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_lesson_progressInput } from './course-create-or-connect-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutUser_lesson_progressInput {

    @Field(() => CourseCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_lesson_progressInput)
    create?: CourseCreateWithoutUser_lesson_progressInput;

    @Field(() => CourseCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
