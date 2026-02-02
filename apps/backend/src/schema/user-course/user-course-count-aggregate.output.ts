import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCourseCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    enrolled_at!: number;

    @Field(() => Int, {nullable:false})
    last_accessed!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    expired_date!: number;

    @Field(() => Int, {nullable:false})
    paused_at!: number;

    @Field(() => Int, {nullable:false})
    pause_until!: number;

    @Field(() => Int, {nullable:false})
    total_paused_days!: number;

    @Field(() => Int, {nullable:false})
    pause_count!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
