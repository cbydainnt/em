import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewUpdateWithoutCourseInput } from './course-review-update-without-course.input';

@InputType()
export class CourseReviewUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewUpdateWithoutCourseInput, {nullable:false})
    @Type(() => CourseReviewUpdateWithoutCourseInput)
    data!: CourseReviewUpdateWithoutCourseInput;
}
