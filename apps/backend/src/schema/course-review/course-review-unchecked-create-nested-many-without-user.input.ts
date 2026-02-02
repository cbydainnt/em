import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateWithoutUserInput } from './course-review-create-without-user.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateOrConnectWithoutUserInput } from './course-review-create-or-connect-without-user.input';
import { CourseReviewCreateManyUserInputEnvelope } from './course-review-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';

@InputType()
export class CourseReviewUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [CourseReviewCreateWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewCreateWithoutUserInput)
    create?: Array<CourseReviewCreateWithoutUserInput>;

    @Field(() => [CourseReviewCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CourseReviewCreateOrConnectWithoutUserInput>;

    @Field(() => CourseReviewCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CourseReviewCreateManyUserInputEnvelope)
    createMany?: CourseReviewCreateManyUserInputEnvelope;

    @Field(() => [CourseReviewWhereUniqueInput], {nullable:true})
    @Type(() => CourseReviewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>>;
}
