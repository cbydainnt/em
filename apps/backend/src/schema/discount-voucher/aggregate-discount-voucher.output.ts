import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DiscountVoucherCountAggregate } from './discount-voucher-count-aggregate.output';
import { DiscountVoucherAvgAggregate } from './discount-voucher-avg-aggregate.output';
import { DiscountVoucherSumAggregate } from './discount-voucher-sum-aggregate.output';
import { DiscountVoucherMinAggregate } from './discount-voucher-min-aggregate.output';
import { DiscountVoucherMaxAggregate } from './discount-voucher-max-aggregate.output';

@ObjectType()
export class AggregateDiscountVoucher {

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
