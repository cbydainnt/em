import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutCourse_viewInput } from './course-update-without-course-view.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCourse_viewInput } from './course-create-without-course-view.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutCourse_viewInput {

    @Field(() => CourseUpdateWithoutCourse_viewInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCourse_viewInput)
    update!: CourseUpdateWithoutCourse_viewInput;

    @Field(() => CourseCreateWithoutCourse_viewInput, {nullable:false})
    @Type(() => CourseCreateWithoutCourse_viewInput)
    create!: CourseCreateWithoutCourse_viewInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
