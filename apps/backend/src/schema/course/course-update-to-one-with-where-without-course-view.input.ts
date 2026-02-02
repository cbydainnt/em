import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutCourse_viewInput } from './course-update-without-course-view.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutCourse_viewInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutCourse_viewInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCourse_viewInput)
    data!: CourseUpdateWithoutCourse_viewInput;
}
