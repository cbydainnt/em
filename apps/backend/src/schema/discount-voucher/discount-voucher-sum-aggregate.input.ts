import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    discount_type?: true;

    @Field(() => Boolean, {nullable:true})
    discount_value?: true;

    @Field(() => Boolean, {nullable:true})
    min_order_amount?: true;

    @Field(() => Boolean, {nullable:true})
    applicable_type?: true;

    @Field(() => Boolean, {nullable:true})
    user_scope?: true;

    @Field(() => Boolean, {nullable:true})
    usage_limit?: true;

    @Field(() => Boolean, {nullable:true})
    used_count?: true;

    @Field(() => Boolean, {nullable:true})
    per_user_limit?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;
}
