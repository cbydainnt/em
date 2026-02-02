import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutUser_coursesInput } from './course-update-without-user-courses.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutUser_coursesInput } from './course-create-without-user-courses.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutUser_coursesInput {

    @Field(() => CourseUpdateWithoutUser_coursesInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_coursesInput)
    update!: CourseUpdateWithoutUser_coursesInput;

    @Field(() => CourseCreateWithoutUser_coursesInput, {nullable:false})
    @Type(() => CourseCreateWithoutUser_coursesInput)
    create!: CourseCreateWithoutUser_coursesInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
