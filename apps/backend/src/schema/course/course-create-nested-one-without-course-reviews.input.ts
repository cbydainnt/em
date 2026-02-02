import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCourseReviewsInput } from './course-create-without-course-reviews.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCourseReviewsInput } from './course-create-or-connect-without-course-reviews.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutCourseReviewsInput {

    @Field(() => CourseCreateWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCourseReviewsInput)
    create?: CourseCreateWithoutCourseReviewsInput;

    @Field(() => CourseCreateOrConnectWithoutCourseReviewsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCourseReviewsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCourseReviewsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
