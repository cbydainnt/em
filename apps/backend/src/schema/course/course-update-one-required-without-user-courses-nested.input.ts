import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_coursesInput } from './course-create-without-user-courses.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_coursesInput } from './course-create-or-connect-without-user-courses.input';
import { CourseUpsertWithoutUser_coursesInput } from './course-upsert-without-user-courses.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutUser_coursesInput } from './course-update-to-one-with-where-without-user-courses.input';

@InputType()
export class CourseUpdateOneRequiredWithoutUser_coursesNestedInput {

    @Field(() => CourseCreateWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_coursesInput)
    create?: CourseCreateWithoutUser_coursesInput;

    @Field(() => CourseCreateOrConnectWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_coursesInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_coursesInput;

    @Field(() => CourseUpsertWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseUpsertWithoutUser_coursesInput)
    upsert?: CourseUpsertWithoutUser_coursesInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutUser_coursesInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutUser_coursesInput)
    update?: CourseUpdateToOneWithWhereWithoutUser_coursesInput;
}
