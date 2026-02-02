import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CourseCount {

    @Field(() => Int, {nullable:false})
    user_courses?: number;

    @Field(() => Int, {nullable:false})
    combos?: number;

    @Field(() => Int, {nullable:false})
    comments?: number;

    @Field(() => Int, {nullable:false})
    notifications?: number;

    @Field(() => Int, {nullable:false})
    sections?: number;

    @Field(() => Int, {nullable:false})
    courseReviews?: number;

    @Field(() => Int, {nullable:false})
    order_items?: number;

    @Field(() => Int, {nullable:false})
    cart_items?: number;

    @Field(() => Int, {nullable:false})
    user_lesson_progress?: number;

    @Field(() => Int, {nullable:false})
    user_quiz_progress?: number;

    @Field(() => Int, {nullable:false})
    reports?: number;

    @Field(() => Int, {nullable:false})
    course_view?: number;

    @Field(() => Int, {nullable:false})
    discount_vouchers?: number;

    @Field(() => Int, {nullable:false})
    quizzes?: number;
}
