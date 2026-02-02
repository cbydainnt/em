import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CartItemMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    cart_item_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    added_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    selected?: keyof typeof SortOrder;
}
