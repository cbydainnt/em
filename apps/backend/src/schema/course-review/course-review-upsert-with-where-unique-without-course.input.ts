import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewUpdateWithoutCourseInput } from './course-review-update-without-course.input';
import { CourseReviewCreateWithoutCourseInput } from './course-review-create-without-course.input';

@InputType()
export class CourseReviewUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewUpdateWithoutCourseInput, {nullable:false})
    @Type(() => CourseReviewUpdateWithoutCourseInput)
    update!: CourseReviewUpdateWithoutCourseInput;

    @Field(() => CourseReviewCreateWithoutCourseInput, {nullable:false})
    @Type(() => CourseReviewCreateWithoutCourseInput)
    create!: CourseReviewCreateWithoutCourseInput;
}
