import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Course } from '../course/course.model';
import { User } from '../user/user.model';

@ObjectType()
export class CourseReview {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => Int, {nullable:false,defaultValue:5})
    rating!: number;

    @Field(() => String, {nullable:true})
    comment!: string | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Course, {nullable:false})
    course?: Course;

    @Field(() => User, {nullable:false})
    user?: User;
}
