import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCourseReviewsInput } from './user-update-without-course-reviews.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCourseReviewsInput } from './user-create-without-course-reviews.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCourseReviewsInput {

    @Field(() => UserUpdateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCourseReviewsInput)
    update!: UserUpdateWithoutCourseReviewsInput;

    @Field(() => UserCreateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => UserCreateWithoutCourseReviewsInput)
    create!: UserCreateWithoutCourseReviewsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
