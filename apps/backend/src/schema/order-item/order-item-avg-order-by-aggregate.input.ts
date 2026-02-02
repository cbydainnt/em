import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class OrderItemAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    item_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    final_price?: keyof typeof SortOrder;
}
