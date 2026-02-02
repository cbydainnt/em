import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherCountAggregate } from './discount-voucher-count-aggregate.output';
import { DiscountVoucherAvgAggregate } from './discount-voucher-avg-aggregate.output';
import { DiscountVoucherSumAggregate } from './discount-voucher-sum-aggregate.output';
import { DiscountVoucherMinAggregate } from './discount-voucher-min-aggregate.output';
import { DiscountVoucherMaxAggregate } from './discount-voucher-max-aggregate.output';

@ObjectType()
export class DiscountVoucherGroupBy {

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:false})
    discount_type!: number;

    @Field(() => Int, {nullable:false})
    discount_value!: number;

    @Field(() => Int, {nullable:true})
    min_order_amount?: number;

    @Field(() => Int, {nullable:false})
    applicable_type!: number;

    @Field(() => Int, {nullable:false})
    user_scope!: number;

    @Field(() => Date, {nullable:false})
    start_date!: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Int, {nullable:true})
    usage_limit?: number;

    @Field(() => Int, {nullable:false})
    used_count!: number;

    @Field(() => Int, {nullable:true})
    per_user_limit?: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => DiscountVoucherCountAggregate, {nullable:true})
    _count?: DiscountVoucherCountAggregate;

    @Field(() => DiscountVoucherAvgAggregate, {nullable:true})
    _avg?: DiscountVoucherAvgAggregate;

    @Field(() => DiscountVoucherSumAggregate, {nullable:true})
    _sum?: DiscountVoucherSumAggregate;

    @Field(() => DiscountVoucherMinAggregate, {nullable:true})
    _min?: DiscountVoucherMinAggregate;

    @Field(() => DiscountVoucherMaxAggregate, {nullable:true})
    _max?: DiscountVoucherMaxAggregate;
}
