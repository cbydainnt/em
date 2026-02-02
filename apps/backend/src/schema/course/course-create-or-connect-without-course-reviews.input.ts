import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCourseReviewsInput } from './course-create-without-course-reviews.input';

@InputType()
export class CourseCreateOrConnectWithoutCourseReviewsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCourseReviewsInput)
    create!: CourseCreateWithoutCourseReviewsInput;
}
