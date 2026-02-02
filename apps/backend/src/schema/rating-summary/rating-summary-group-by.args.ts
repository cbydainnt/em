import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Type } from 'class-transformer';
import { RatingSummaryOrderByWithAggregationInput } from './rating-summary-order-by-with-aggregation.input';
import { RatingSummaryScalarFieldEnum } from './rating-summary-scalar-field.enum';
import { RatingSummaryScalarWhereWithAggregatesInput } from './rating-summary-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { RatingSummaryCountAggregateInput } from './rating-summary-count-aggregate.input';
import { RatingSummaryAvgAggregateInput } from './rating-summary-avg-aggregate.input';
import { RatingSummarySumAggregateInput } from './rating-summary-sum-aggregate.input';
import { RatingSummaryMinAggregateInput } from './rating-summary-min-aggregate.input';
import { RatingSummaryMaxAggregateInput } from './rating-summary-max-aggregate.input';

@ArgsType()
export class RatingSummaryGroupByArgs {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;

    @Field(() => [RatingSummaryOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<RatingSummaryOrderByWithAggregationInput>;

    @Field(() => [RatingSummaryScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof RatingSummaryScalarFieldEnum>;

    @Field(() => RatingSummaryScalarWhereWithAggregatesInput, {nullable:true})
    having?: RatingSummaryScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => RatingSummaryCountAggregateInput, {nullable:true})
    _count?: RatingSummaryCountAggregateInput;

    @Field(() => RatingSummaryAvgAggregateInput, {nullable:true})
    _avg?: RatingSummaryAvgAggregateInput;

    @Field(() => RatingSummarySumAggregateInput, {nullable:true})
    _sum?: RatingSummarySumAggregateInput;

    @Field(() => RatingSummaryMinAggregateInput, {nullable:true})
    _min?: RatingSummaryMinAggregateInput;

    @Field(() => RatingSummaryMaxAggregateInput, {nullable:true})
    _max?: RatingSummaryMaxAggregateInput;
}
