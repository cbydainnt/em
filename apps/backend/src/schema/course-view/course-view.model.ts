import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Course } from '../course/course.model';
import { User } from '../user/user.model';

@ObjectType()
export class CourseView {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:true})
    user_id!: string | null;

    @Field(() => String, {nullable:true})
    ip_address!: string | null;

    @Field(() => String, {nullable:true})
    user_agent!: string | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Course, {nullable:false})
    course?: Course;

    @Field(() => User, {nullable:true})
    user?: User | null;
}
