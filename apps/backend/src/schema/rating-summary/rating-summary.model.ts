import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Course } from '../course/course.model';

@ObjectType()
export class RatingSummary {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Float, {nullable:false,defaultValue:0})
    avg_rating!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_reviews!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    rating_1_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    rating_2_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    rating_3_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    rating_4_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    rating_5_count!: number;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Course, {nullable:false})
    course?: Course;
}
