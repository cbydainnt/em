import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherUsageCountAggregate {

    @Field(() => Int, {nullable:false})
    voucher_usage_id!: number;

    @Field(() => Int, {nullable:false})
    discount_voucher_id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    order_id!: number;

    @Field(() => Int, {nullable:false})
    used_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
