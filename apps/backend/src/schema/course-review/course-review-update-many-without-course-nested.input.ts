import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateWithoutCourseInput } from './course-review-create-without-course.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateOrConnectWithoutCourseInput } from './course-review-create-or-connect-without-course.input';
import { CourseReviewUpsertWithWhereUniqueWithoutCourseInput } from './course-review-upsert-with-where-unique-without-course.input';
import { CourseReviewCreateManyCourseInputEnvelope } from './course-review-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { CourseReviewUpdateWithWhereUniqueWithoutCourseInput } from './course-review-update-with-where-unique-without-course.input';
import { CourseReviewUpdateManyWithWhereWithoutCourseInput } from './course-review-update-many-with-where-without-course.input';
import { CourseReviewScalarWhereInput } from './course-review-scalar-where.input';

@InputType()
export class CourseReviewUpdateManyWithoutCourseNestedInput {

    @Field(() => [CourseReviewCreateWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewCreateWithoutCourseInput)
    create?: Array<CourseReviewCreateWithoutCourseInput>;

    @Field(() => [CourseReviewCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CourseReviewCreateOrConnectWithoutCourseInput>;

    @Field(() => [CourseReviewUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<CourseReviewUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => CourseReviewCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CourseReviewCreateManyCourseInputEnvelope)
    createMany?: CourseReviewCreateManyCourseInputEnvelope;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;

    @Field(() => [CourseReviewUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<CourseReviewUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [CourseReviewUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => CourseReviewUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<CourseReviewUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [CourseReviewScalarWhereInput], {nullable:true})
    @Type(() => CourseReviewScalarWhereInput)
    deleteMany?: Array<CourseReviewScalarWhereInput>;
}
