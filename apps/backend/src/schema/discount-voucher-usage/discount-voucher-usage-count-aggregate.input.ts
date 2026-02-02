import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherUsageCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    voucher_usage_id?: true;

    @Field(() => Boolean, {nullable:true})
    discount_voucher_id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    order_id?: true;

    @Field(() => Boolean, {nullable:true})
    used_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
