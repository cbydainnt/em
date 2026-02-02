import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCourseReviewsInput } from './user-update-without-course-reviews.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCourseReviewsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCourseReviewsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCourseReviewsInput)
    data!: UserUpdateWithoutCourseReviewsInput;
}
