import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherCountAggregate {

    @Field(() => Int, {nullable:false})
    discount_voucher_id!: number;

    @Field(() => Int, {nullable:false})
    code!: number;

    @Field(() => Int, {nullable:false})
    discount_type!: number;

    @Field(() => Int, {nullable:false})
    discount_value!: number;

    @Field(() => Int, {nullable:false})
    min_order_amount!: number;

    @Field(() => Int, {nullable:false})
    applicable_type!: number;

    @Field(() => Int, {nullable:false})
    user_scope!: number;

    @Field(() => Int, {nullable:false})
    start_date!: number;

    @Field(() => Int, {nullable:false})
    end_date!: number;

    @Field(() => Int, {nullable:false})
    usage_limit!: number;

    @Field(() => Int, {nullable:false})
    used_count!: number;

    @Field(() => Int, {nullable:false})
    per_user_limit!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
