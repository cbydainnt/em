import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RatingSummaryCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    avg_rating!: number;

    @Field(() => Int, {nullable:false})
    total_reviews!: number;

    @Field(() => Int, {nullable:false})
    rating_1_count!: number;

    @Field(() => Int, {nullable:false})
    rating_2_count!: number;

    @Field(() => Int, {nullable:false})
    rating_3_count!: number;

    @Field(() => Int, {nullable:false})
    rating_4_count!: number;

    @Field(() => Int, {nullable:false})
    rating_5_count!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
