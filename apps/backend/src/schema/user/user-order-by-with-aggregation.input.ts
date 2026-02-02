import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserCountOrderByAggregateInput } from './user-count-order-by-aggregate.input';
import { UserMaxOrderByAggregateInput } from './user-max-order-by-aggregate.input';
import { UserMinOrderByAggregateInput } from './user-min-order-by-aggregate.input';

@InputType()
export class UserOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    phone?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    avatar?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    googleId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    password?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deleted_by_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verified?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verifyToken?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    verifyExpires?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passwordResetToken?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passwordResetExpires?: keyof typeof SortOrder;

    @Field(() => UserCountOrderByAggregateInput, {nullable:true})
    _count?: UserCountOrderByAggregateInput;

    @Field(() => UserMaxOrderByAggregateInput, {nullable:true})
    _max?: UserMaxOrderByAggregateInput;

    @Field(() => UserMinOrderByAggregateInput, {nullable:true})
    _min?: UserMinOrderByAggregateInput;
}
