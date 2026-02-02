import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ComboSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    combo_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;
}
