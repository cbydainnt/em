import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CourseCountOrderByAggregateInput } from './course-count-order-by-aggregate.input';
import { CourseAvgOrderByAggregateInput } from './course-avg-order-by-aggregate.input';
import { CourseMaxOrderByAggregateInput } from './course-max-order-by-aggregate.input';
import { CourseMinOrderByAggregateInput } from './course-min-order-by-aggregate.input';
import { CourseSumOrderByAggregateInput } from './course-sum-order-by-aggregate.input';

@InputType()
export class CourseOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    state?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    thumbnail?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_duration_months?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_expire_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    view_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => CourseCountOrderByAggregateInput, {nullable:true})
    _count?: CourseCountOrderByAggregateInput;

    @Field(() => CourseAvgOrderByAggregateInput, {nullable:true})
    _avg?: CourseAvgOrderByAggregateInput;

    @Field(() => CourseMaxOrderByAggregateInput, {nullable:true})
    _max?: CourseMaxOrderByAggregateInput;

    @Field(() => CourseMinOrderByAggregateInput, {nullable:true})
    _min?: CourseMinOrderByAggregateInput;

    @Field(() => CourseSumOrderByAggregateInput, {nullable:true})
    _sum?: CourseSumOrderByAggregateInput;
}
