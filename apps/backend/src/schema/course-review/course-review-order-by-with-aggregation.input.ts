import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CourseReviewCountOrderByAggregateInput } from './course-review-count-order-by-aggregate.input';
import { CourseReviewAvgOrderByAggregateInput } from './course-review-avg-order-by-aggregate.input';
import { CourseReviewMaxOrderByAggregateInput } from './course-review-max-order-by-aggregate.input';
import { CourseReviewMinOrderByAggregateInput } from './course-review-min-order-by-aggregate.input';
import { CourseReviewSumOrderByAggregateInput } from './course-review-sum-order-by-aggregate.input';

@InputType()
export class CourseReviewOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    rating?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    comment?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => CourseReviewCountOrderByAggregateInput, {nullable:true})
    _count?: CourseReviewCountOrderByAggregateInput;

    @Field(() => CourseReviewAvgOrderByAggregateInput, {nullable:true})
    _avg?: CourseReviewAvgOrderByAggregateInput;

    @Field(() => CourseReviewMaxOrderByAggregateInput, {nullable:true})
    _max?: CourseReviewMaxOrderByAggregateInput;

    @Field(() => CourseReviewMinOrderByAggregateInput, {nullable:true})
    _min?: CourseReviewMinOrderByAggregateInput;

    @Field(() => CourseReviewSumOrderByAggregateInput, {nullable:true})
    _sum?: CourseReviewSumOrderByAggregateInput;
}
