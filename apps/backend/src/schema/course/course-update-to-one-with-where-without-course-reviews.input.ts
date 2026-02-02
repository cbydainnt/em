import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutCourseReviewsInput } from './course-update-without-course-reviews.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutCourseReviewsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCourseReviewsInput)
    data!: CourseUpdateWithoutCourseReviewsInput;
}
