import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCourse_viewInput } from './course-create-without-course-view.input';

@InputType()
export class CourseCreateOrConnectWithoutCourse_viewInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutCourse_viewInput, {nullable:false})
    @Type(() => CourseCreateWithoutCourse_viewInput)
    create!: CourseCreateWithoutCourse_viewInput;
}
