import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserLessonProgressCountOrderByAggregateInput } from './user-lesson-progress-count-order-by-aggregate.input';
import { UserLessonProgressAvgOrderByAggregateInput } from './user-lesson-progress-avg-order-by-aggregate.input';
import { UserLessonProgressMaxOrderByAggregateInput } from './user-lesson-progress-max-order-by-aggregate.input';
import { UserLessonProgressMinOrderByAggregateInput } from './user-lesson-progress-min-order-by-aggregate.input';
import { UserLessonProgressSumOrderByAggregateInput } from './user-lesson-progress-sum-order-by-aggregate.input';

@InputType()
export class UserLessonProgressOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    watched_seconds?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    completed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    last_accessed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    segments?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => UserLessonProgressCountOrderByAggregateInput, {nullable:true})
    _count?: UserLessonProgressCountOrderByAggregateInput;

    @Field(() => UserLessonProgressAvgOrderByAggregateInput, {nullable:true})
    _avg?: UserLessonProgressAvgOrderByAggregateInput;

    @Field(() => UserLessonProgressMaxOrderByAggregateInput, {nullable:true})
    _max?: UserLessonProgressMaxOrderByAggregateInput;

    @Field(() => UserLessonProgressMinOrderByAggregateInput, {nullable:true})
    _min?: UserLessonProgressMinOrderByAggregateInput;

    @Field(() => UserLessonProgressSumOrderByAggregateInput, {nullable:true})
    _sum?: UserLessonProgressSumOrderByAggregateInput;
}
