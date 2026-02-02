import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_coursesInput } from './course-create-without-user-courses.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_coursesInput } from './course-create-or-connect-without-user-courses.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutUser_coursesInput {

    @Field(() => CourseCreateWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_coursesInput)
    create?: CourseCreateWithoutUser_coursesInput;

    @Field(() => CourseCreateOrConnectWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_coursesInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_coursesInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
