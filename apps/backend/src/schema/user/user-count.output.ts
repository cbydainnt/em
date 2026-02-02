import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCount {

    @Field(() => Int, {nullable:false})
    createds?: number;

    @Field(() => Int, {nullable:false})
    updateds?: number;

    @Field(() => Int, {nullable:false})
    deleteds?: number;

    @Field(() => Int, {nullable:false})
    notifications?: number;

    @Field(() => Int, {nullable:false})
    userNotifications?: number;

    @Field(() => Int, {nullable:false})
    user_courses?: number;

    @Field(() => Int, {nullable:false})
    comments?: number;

    @Field(() => Int, {nullable:false})
    courseReviews?: number;

    @Field(() => Int, {nullable:false})
    orders?: number;

    @Field(() => Int, {nullable:false})
    discount_vouchers?: number;

    @Field(() => Int, {nullable:false})
    cartItems?: number;

    @Field(() => Int, {nullable:false})
    user_lesson_progress?: number;

    @Field(() => Int, {nullable:false})
    notes?: number;

    @Field(() => Int, {nullable:false})
    reports?: number;

    @Field(() => Int, {nullable:false})
    reportComments?: number;

    @Field(() => Int, {nullable:false})
    resolved_reports?: number;

    @Field(() => Int, {nullable:false})
    quiz_progress?: number;

    @Field(() => Int, {nullable:false})
    allowed_discount_vouchers?: number;

    @Field(() => Int, {nullable:false})
    course_view?: number;
}
