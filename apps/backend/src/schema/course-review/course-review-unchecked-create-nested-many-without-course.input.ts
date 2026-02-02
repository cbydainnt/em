import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateWithoutCourseInput } from './course-review-create-without-course.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateOrConnectWithoutCourseInput } from './course-review-create-or-connect-without-course.input';
import { CourseReviewCreateManyCourseInputEnvelope } from './course-review-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';

@InputType()
export class CourseReviewUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [CourseReviewCreateWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewCreateWithoutCourseInput)
    create?: Array<CourseReviewCreateWithoutCourseInput>;

    @Field(() => [CourseReviewCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CourseReviewCreateOrConnectWithoutCourseInput>;

    @Field(() => CourseReviewCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CourseReviewCreateManyCourseInputEnvelope)
    createMany?: CourseReviewCreateManyCourseInputEnvelope;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;
}
