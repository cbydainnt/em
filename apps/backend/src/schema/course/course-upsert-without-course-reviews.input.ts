import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutCourseReviewsInput } from './course-update-without-course-reviews.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCourseReviewsInput } from './course-create-without-course-reviews.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutCourseReviewsInput {

    @Field(() => CourseUpdateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCourseReviewsInput)
    update!: CourseUpdateWithoutCourseReviewsInput;

    @Field(() => CourseCreateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCourseReviewsInput)
    create!: CourseCreateWithoutCourseReviewsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
