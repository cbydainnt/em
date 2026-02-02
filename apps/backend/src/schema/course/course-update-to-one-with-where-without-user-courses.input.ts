import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutUser_coursesInput } from './course-update-without-user-courses.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutUser_coursesInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutUser_coursesInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_coursesInput)
    data!: CourseUpdateWithoutUser_coursesInput;
}
