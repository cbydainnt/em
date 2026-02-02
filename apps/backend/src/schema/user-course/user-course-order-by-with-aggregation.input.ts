import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserCourseCountOrderByAggregateInput } from './user-course-count-order-by-aggregate.input';
import { UserCourseAvgOrderByAggregateInput } from './user-course-avg-order-by-aggregate.input';
import { UserCourseMaxOrderByAggregateInput } from './user-course-max-order-by-aggregate.input';
import { UserCourseMinOrderByAggregateInput } from './user-course-min-order-by-aggregate.input';
import { UserCourseSumOrderByAggregateInput } from './user-course-sum-order-by-aggregate.input';

@InputType()
export class UserCourseOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    enrolled_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    last_accessed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expired_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    paused_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pause_until?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_paused_days?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pause_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => UserCourseCountOrderByAggregateInput, {nullable:true})
    _count?: UserCourseCountOrderByAggregateInput;

    @Field(() => UserCourseAvgOrderByAggregateInput, {nullable:true})
    _avg?: UserCourseAvgOrderByAggregateInput;

    @Field(() => UserCourseMaxOrderByAggregateInput, {nullable:true})
    _max?: UserCourseMaxOrderByAggregateInput;

    @Field(() => UserCourseMinOrderByAggregateInput, {nullable:true})
    _min?: UserCourseMinOrderByAggregateInput;

    @Field(() => UserCourseSumOrderByAggregateInput, {nullable:true})
    _sum?: UserCourseSumOrderByAggregateInput;
}
