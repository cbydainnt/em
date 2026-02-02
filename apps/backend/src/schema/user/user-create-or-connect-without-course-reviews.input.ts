import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCourseReviewsInput } from './user-create-without-course-reviews.input';

@InputType()
export class UserCreateOrConnectWithoutCourseReviewsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => UserCreateWithoutCourseReviewsInput)
    create!: UserCreateWithoutCourseReviewsInput;
}
