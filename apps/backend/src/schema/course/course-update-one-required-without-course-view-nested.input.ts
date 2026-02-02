import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCourse_viewInput } from './course-create-without-course-view.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCourse_viewInput } from './course-create-or-connect-without-course-view.input';
import { CourseUpsertWithoutCourse_viewInput } from './course-upsert-without-course-view.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutCourse_viewInput } from './course-update-to-one-with-where-without-course-view.input';

@InputType()
export class CourseUpdateOneRequiredWithoutCourse_viewNestedInput {

    @Field(() => CourseCreateWithoutCourse_viewInput, {nullable:true})
    @Type(() => CourseCreateWithoutCourse_viewInput)
    create?: CourseCreateWithoutCourse_viewInput;

    @Field(() => CourseCreateOrConnectWithoutCourse_viewInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCourse_viewInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCourse_viewInput;

    @Field(() => CourseUpsertWithoutCourse_viewInput, {nullable:true})
    @Type(() => CourseUpsertWithoutCourse_viewInput)
    upsert?: CourseUpsertWithoutCourse_viewInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutCourse_viewInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutCourse_viewInput)
    update?: CourseUpdateToOneWithWhereWithoutCourse_viewInput;
}
