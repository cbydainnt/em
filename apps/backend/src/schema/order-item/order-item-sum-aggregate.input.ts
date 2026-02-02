import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    item_type?: true;

    @Field(() => Boolean, {nullable:true})
    final_price?: true;
}
