import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserNotificationCountOrderByAggregateInput } from './user-notification-count-order-by-aggregate.input';
import { UserNotificationAvgOrderByAggregateInput } from './user-notification-avg-order-by-aggregate.input';
import { UserNotificationMaxOrderByAggregateInput } from './user-notification-max-order-by-aggregate.input';
import { UserNotificationMinOrderByAggregateInput } from './user-notification-min-order-by-aggregate.input';
import { UserNotificationSumOrderByAggregateInput } from './user-notification-sum-order-by-aggregate.input';

@InputType()
export class UserNotificationOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    notification_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    read_at?: keyof typeof SortOrder;

    @Field(() => UserNotificationCountOrderByAggregateInput, {nullable:true})
    _count?: UserNotificationCountOrderByAggregateInput;

    @Field(() => UserNotificationAvgOrderByAggregateInput, {nullable:true})
    _avg?: UserNotificationAvgOrderByAggregateInput;

    @Field(() => UserNotificationMaxOrderByAggregateInput, {nullable:true})
    _max?: UserNotificationMaxOrderByAggregateInput;

    @Field(() => UserNotificationMinOrderByAggregateInput, {nullable:true})
    _min?: UserNotificationMinOrderByAggregateInput;

    @Field(() => UserNotificationSumOrderByAggregateInput, {nullable:true})
    _sum?: UserNotificationSumOrderByAggregateInput;
}
