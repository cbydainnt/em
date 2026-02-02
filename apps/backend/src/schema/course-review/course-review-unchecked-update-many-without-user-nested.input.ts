import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateWithoutUserInput } from './course-review-create-without-user.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateOrConnectWithoutUserInput } from './course-review-create-or-connect-without-user.input';
import { CourseReviewUpsertWithWhereUniqueWithoutUserInput } from './course-review-upsert-with-where-unique-without-user.input';
import { CourseReviewCreateManyUserInputEnvelope } from './course-review-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { CourseReviewUpdateWithWhereUniqueWithoutUserInput } from './course-review-update-with-where-unique-without-user.input';
import { CourseReviewUpdateManyWithWhereWithoutUserInput } from './course-review-update-many-with-where-without-user.input';
import { CourseReviewScalarWhereInput } from './course-review-scalar-where.input';

@InputType()
export class CourseReviewUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [CourseReviewCreateWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewCreateWithoutUserInput)
    create?: Array<CourseReviewCreateWithoutUserInput>;

    @Field(() => [CourseReviewCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CourseReviewCreateOrConnectWithoutUserInput>;

    @Field(() => [CourseReviewUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<CourseReviewUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CourseReviewCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CourseReviewCreateManyUserInputEnvelope)
    createMany?: CourseReviewCreateManyUserInputEnvelope;

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

    @Field(() => [CourseReviewUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<CourseReviewUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CourseReviewUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => CourseReviewUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<CourseReviewUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CourseReviewScalarWhereInput], {nullable:true})
    @Type(() => CourseReviewScalarWhereInput)
    deleteMany?: Array<CourseReviewScalarWhereInput>;
}
