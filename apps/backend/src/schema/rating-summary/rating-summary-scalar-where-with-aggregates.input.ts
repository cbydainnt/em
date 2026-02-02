import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class RatingSummaryScalarWhereWithAggregatesInput {

    @Field(() => [RatingSummaryScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<RatingSummaryScalarWhereWithAggregatesInput>;

    @Field(() => [RatingSummaryScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<RatingSummaryScalarWhereWithAggregatesInput>;

    @Field(() => [RatingSummaryScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<RatingSummaryScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    course_id?: StringWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    avg_rating?: FloatWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    total_reviews?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    rating_1_count?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    rating_2_count?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    rating_3_count?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    rating_4_count?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    rating_5_count?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updated_at?: DateTimeWithAggregatesFilter;
}
