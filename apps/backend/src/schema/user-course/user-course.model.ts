import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';

@ObjectType()
export class UserCourse {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:true})
    enrolled_at!: Date | null;

    @Field(() => Date, {nullable:true})
    last_accessed!: Date | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Date, {nullable:true})
    expired_date!: Date | null;

    @Field(() => Date, {nullable:true})
    paused_at!: Date | null;

    @Field(() => Date, {nullable:true})
    pause_until!: Date | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_paused_days!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    pause_count!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Course, {nullable:false})
    course?: Course;
}
