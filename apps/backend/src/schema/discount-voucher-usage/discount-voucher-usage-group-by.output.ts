import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DiscountVoucherUsageCountAggregate } from './discount-voucher-usage-count-aggregate.output';
import { DiscountVoucherUsageMinAggregate } from './discount-voucher-usage-min-aggregate.output';
import { DiscountVoucherUsageMaxAggregate } from './discount-voucher-usage-max-aggregate.output';

@ObjectType()
export class DiscountVoucherUsageGroupBy {

    @Field(() => String, {nullable:false})
    voucher_usage_id!: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => Date, {nullable:false})
    used_at!: Date | string;

    @Field(() => DiscountVoucherUsageCountAggregate, {nullable:true})
    _count?: DiscountVoucherUsageCountAggregate;

    @Field(() => DiscountVoucherUsageMinAggregate, {nullable:true})
    _min?: DiscountVoucherUsageMinAggregate;

    @Field(() => DiscountVoucherUsageMaxAggregate, {nullable:true})
    _max?: DiscountVoucherUsageMaxAggregate;
}
