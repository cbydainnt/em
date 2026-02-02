import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { NotificationCountOrderByAggregateInput } from './notification-count-order-by-aggregate.input';
import { NotificationAvgOrderByAggregateInput } from './notification-avg-order-by-aggregate.input';
import { NotificationMaxOrderByAggregateInput } from './notification-max-order-by-aggregate.input';
import { NotificationMinOrderByAggregateInput } from './notification-min-order-by-aggregate.input';
import { NotificationSumOrderByAggregateInput } from './notification-sum-order-by-aggregate.input';

@InputType()
export class NotificationOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    notification_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    message?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    context?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    action_url?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => NotificationCountOrderByAggregateInput, {nullable:true})
    _count?: NotificationCountOrderByAggregateInput;

    @Field(() => NotificationAvgOrderByAggregateInput, {nullable:true})
    _avg?: NotificationAvgOrderByAggregateInput;

    @Field(() => NotificationMaxOrderByAggregateInput, {nullable:true})
    _max?: NotificationMaxOrderByAggregateInput;

    @Field(() => NotificationMinOrderByAggregateInput, {nullable:true})
    _min?: NotificationMinOrderByAggregateInput;

    @Field(() => NotificationSumOrderByAggregateInput, {nullable:true})
    _sum?: NotificationSumOrderByAggregateInput;
}
