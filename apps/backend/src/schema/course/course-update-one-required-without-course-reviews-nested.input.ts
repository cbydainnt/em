import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCourseReviewsInput } from './course-create-without-course-reviews.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCourseReviewsInput } from './course-create-or-connect-without-course-reviews.input';
import { CourseUpsertWithoutCourseReviewsInput } from './course-upsert-without-course-reviews.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutCourseReviewsInput } from './course-update-to-one-with-where-without-course-reviews.input';

@InputType()
export class CourseUpdateOneRequiredWithoutCourseReviewsNestedInput {

    @Field(() => CourseCreateWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCourseReviewsInput)
    create?: CourseCreateWithoutCourseReviewsInput;

    @Field(() => CourseCreateOrConnectWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCourseReviewsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCourseReviewsInput;

    @Field(() => CourseUpsertWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutCourseReviewsInput)
    upsert?: CourseUpsertWithoutCourseReviewsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutCourseReviewsInput)
    update?: CourseUpdateToOneWithWhereWithoutCourseReviewsInput;
}
