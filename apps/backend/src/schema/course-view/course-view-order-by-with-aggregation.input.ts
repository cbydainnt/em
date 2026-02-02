import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CourseViewCountOrderByAggregateInput } from './course-view-count-order-by-aggregate.input';
import { CourseViewMaxOrderByAggregateInput } from './course-view-max-order-by-aggregate.input';
import { CourseViewMinOrderByAggregateInput } from './course-view-min-order-by-aggregate.input';

@InputType()
export class CourseViewOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ip_address?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_agent?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => CourseViewCountOrderByAggregateInput, {nullable:true})
    _count?: CourseViewCountOrderByAggregateInput;

    @Field(() => CourseViewMaxOrderByAggregateInput, {nullable:true})
    _max?: CourseViewMaxOrderByAggregateInput;

    @Field(() => CourseViewMinOrderByAggregateInput, {nullable:true})
    _min?: CourseViewMinOrderByAggregateInput;
}
