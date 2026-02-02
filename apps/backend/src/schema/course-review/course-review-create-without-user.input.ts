import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutCourseReviewsInput } from '../course/course-create-nested-one-without-course-reviews.input';

@InputType()
export class CourseReviewCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    rating?: number;

    @Field(() => String, {nullable:true})
    comment?: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => CourseCreateNestedOneWithoutCourseReviewsInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutCourseReviewsInput;
}
