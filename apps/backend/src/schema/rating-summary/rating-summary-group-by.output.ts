import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RatingSummaryCountAggregate } from './rating-summary-count-aggregate.output';
import { RatingSummaryAvgAggregate } from './rating-summary-avg-aggregate.output';
import { RatingSummarySumAggregate } from './rating-summary-sum-aggregate.output';
import { RatingSummaryMinAggregate } from './rating-summary-min-aggregate.output';
import { RatingSummaryMaxAggregate } from './rating-summary-max-aggregate.output';

@ObjectType()
export class RatingSummaryGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Float, {nullable:false})
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

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => RatingSummaryCountAggregate, {nullable:true})
    _count?: RatingSummaryCountAggregate;

    @Field(() => RatingSummaryAvgAggregate, {nullable:true})
    _avg?: RatingSummaryAvgAggregate;

    @Field(() => RatingSummarySumAggregate, {nullable:true})
    _sum?: RatingSummarySumAggregate;

    @Field(() => RatingSummaryMinAggregate, {nullable:true})
    _min?: RatingSummaryMinAggregate;

    @Field(() => RatingSummaryMaxAggregate, {nullable:true})
    _max?: RatingSummaryMaxAggregate;
}
