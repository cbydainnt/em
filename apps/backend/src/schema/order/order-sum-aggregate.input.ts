import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    total_price?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    payment_method?: true;
}
