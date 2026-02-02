import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class RatingSummaryMinOrderByAggregateInput {

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
}
