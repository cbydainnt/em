import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CourseCountAggregate {

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    course_name!: number;

    @Field(() => Int, {nullable:false})
    course_description!: number;

    @Field(() => Int, {nullable:false})
    course_price!: number;

    @Field(() => Int, {nullable:false})
    course_original_price!: number;

    @Field(() => Int, {nullable:false})
    state!: number;

    @Field(() => Int, {nullable:false})
    target!: number;

    @Field(() => Int, {nullable:false})
    thumbnail!: number;

    @Field(() => Int, {nullable:false})
    access_duration_months!: number;

    @Field(() => Int, {nullable:false})
    access_type!: number;

    @Field(() => Int, {nullable:false})
    access_expire_at!: number;

    @Field(() => Int, {nullable:false})
    view_count!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    created_by!: number;

    @Field(() => Int, {nullable:false})
    updated_by!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
