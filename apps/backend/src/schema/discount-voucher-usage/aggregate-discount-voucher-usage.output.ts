import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DiscountVoucherUsageCountAggregate } from './discount-voucher-usage-count-aggregate.output';
import { DiscountVoucherUsageMinAggregate } from './discount-voucher-usage-min-aggregate.output';
import { DiscountVoucherUsageMaxAggregate } from './discount-voucher-usage-max-aggregate.output';

@ObjectType()
export class AggregateDiscountVoucherUsage {

    @Field(() => DiscountVoucherUsageCountAggregate, {nullable:true})
    _count?: DiscountVoucherUsageCountAggregate;

    @Field(() => DiscountVoucherUsageMinAggregate, {nullable:true})
    _min?: DiscountVoucherUsageMinAggregate;

    @Field(() => DiscountVoucherUsageMaxAggregate, {nullable:true})
    _max?: DiscountVoucherUsageMaxAggregate;
}
