import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherSumAggregate {

    @Field(() => Int, {nullable:true})
    discount_type?: number;

    @Field(() => Int, {nullable:true})
    discount_value?: number;

    @Field(() => Int, {nullable:true})
    min_order_amount?: number;

    @Field(() => Int, {nullable:true})
    applicable_type?: number;

    @Field(() => Int, {nullable:true})
    user_scope?: number;

    @Field(() => Int, {nullable:true})
    usage_limit?: number;

    @Field(() => Int, {nullable:true})
    used_count?: number;

    @Field(() => Int, {nullable:true})
    per_user_limit?: number;

    @Field(() => Int, {nullable:true})
    status?: number;
}
