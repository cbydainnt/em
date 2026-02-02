import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCourseReviewsInput } from './user-create-without-course-reviews.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCourseReviewsInput } from './user-create-or-connect-without-course-reviews.input';
import { UserUpsertWithoutCourseReviewsInput } from './user-upsert-without-course-reviews.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCourseReviewsInput } from './user-update-to-one-with-where-without-course-reviews.input';

@InputType()
export class UserUpdateOneRequiredWithoutCourseReviewsNestedInput {

    @Field(() => UserCreateWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserCreateWithoutCourseReviewsInput)
    create?: UserCreateWithoutCourseReviewsInput;

    @Field(() => UserCreateOrConnectWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCourseReviewsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCourseReviewsInput;

    @Field(() => UserUpsertWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserUpsertWithoutCourseReviewsInput)
    upsert?: UserUpsertWithoutCourseReviewsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCourseReviewsInput)
    update?: UserUpdateToOneWithWhereWithoutCourseReviewsInput;
}
