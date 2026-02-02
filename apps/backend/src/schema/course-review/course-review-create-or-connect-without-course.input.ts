import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateWithoutCourseInput } from './course-review-create-without-course.input';

@InputType()
export class CourseReviewCreateOrConnectWithoutCourseInput {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewCreateWithoutCourseInput, {nullable:false})
    @Type(() => CourseReviewCreateWithoutCourseInput)
    create!: CourseReviewCreateWithoutCourseInput;
}
