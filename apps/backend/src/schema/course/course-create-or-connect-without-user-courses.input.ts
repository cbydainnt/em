import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutUser_coursesInput } from './course-create-without-user-courses.input';

@InputType()
export class CourseCreateOrConnectWithoutUser_coursesInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutUser_coursesInput, {nullable:false})
    @Type(() => CourseCreateWithoutUser_coursesInput)
    create!: CourseCreateWithoutUser_coursesInput;
}
