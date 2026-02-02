import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCourseReviewsInput } from './user-create-without-course-reviews.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCourseReviewsInput } from './user-create-or-connect-without-course-reviews.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCourseReviewsInput {

    @Field(() => UserCreateWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserCreateWithoutCourseReviewsInput)
    create?: UserCreateWithoutCourseReviewsInput;

    @Field(() => UserCreateOrConnectWithoutCourseReviewsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCourseReviewsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCourseReviewsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
