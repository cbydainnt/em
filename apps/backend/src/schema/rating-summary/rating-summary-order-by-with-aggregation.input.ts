import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { RatingSummaryCountOrderByAggregateInput } from './rating-summary-count-order-by-aggregate.input';
import { RatingSummaryAvgOrderByAggregateInput } from './rating-summary-avg-order-by-aggregate.input';
import { RatingSummaryMaxOrderByAggregateInput } from './rating-summary-max-order-by-aggregate.input';
import { RatingSummaryMinOrderByAggregateInput } from './rating-summary-min-order-by-aggregate.input';
import { RatingSummarySumOrderByAggregateInput } from './rating-summary-sum-order-by-aggregate.input';

@InputType()
export class RatingSummaryOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    avg_rating?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_reviews?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating_1_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating_2_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating_3_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating_4_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating_5_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => RatingSummaryCountOrderByAggregateInput, {nullable:true})
    _count?: RatingSummaryCountOrderByAggregateInput;

    @Field(() => RatingSummaryAvgOrderByAggregateInput, {nullable:true})
    _avg?: RatingSummaryAvgOrderByAggregateInput;

    @Field(() => RatingSummaryMaxOrderByAggregateInput, {nullable:true})
    _max?: RatingSummaryMaxOrderByAggregateInput;

    @Field(() => RatingSummaryMinOrderByAggregateInput, {nullable:true})
    _min?: RatingSummaryMinOrderByAggregateInput;

    @Field(() => RatingSummarySumOrderByAggregateInput, {nullable:true})
    _sum?: RatingSummarySumOrderByAggregateInput;
}
