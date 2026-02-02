import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    discount_voucher_id?: true;

    @Field(() => Boolean, {nullable:true})
    code?: true;

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
    start_date?: true;

    @Field(() => Boolean, {nullable:true})
    end_date?: true;

    @Field(() => Boolean, {nullable:true})
    usage_limit?: true;

    @Field(() => Boolean, {nullable:true})
    used_count?: true;

    @Field(() => Boolean, {nullable:true})
    per_user_limit?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
