import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Type } from 'class-transformer';
import { RatingSummaryOrderByWithRelationInput } from './rating-summary-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RatingSummaryCountAggregateInput } from './rating-summary-count-aggregate.input';
import { RatingSummaryAvgAggregateInput } from './rating-summary-avg-aggregate.input';
import { RatingSummarySumAggregateInput } from './rating-summary-sum-aggregate.input';
import { RatingSummaryMinAggregateInput } from './rating-summary-min-aggregate.input';
import { RatingSummaryMaxAggregateInput } from './rating-summary-max-aggregate.input';

@ArgsType()
export class RatingSummaryAggregateArgs {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;

    @Field(() => [RatingSummaryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RatingSummaryOrderByWithRelationInput>;

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;

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
