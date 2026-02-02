import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { RatingSummaryCountAggregate } from './rating-summary-count-aggregate.output';
import { RatingSummaryAvgAggregate } from './rating-summary-avg-aggregate.output';
import { RatingSummarySumAggregate } from './rating-summary-sum-aggregate.output';
import { RatingSummaryMinAggregate } from './rating-summary-min-aggregate.output';
import { RatingSummaryMaxAggregate } from './rating-summary-max-aggregate.output';

@ObjectType()
export class AggregateRatingSummary {

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
