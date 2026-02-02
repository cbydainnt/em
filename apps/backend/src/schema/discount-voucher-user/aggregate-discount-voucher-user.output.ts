import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DiscountVoucherUserCountAggregate } from './discount-voucher-user-count-aggregate.output';
import { DiscountVoucherUserMinAggregate } from './discount-voucher-user-min-aggregate.output';
import { DiscountVoucherUserMaxAggregate } from './discount-voucher-user-max-aggregate.output';

@ObjectType()
export class AggregateDiscountVoucherUser {

    @Field(() => DiscountVoucherUserCountAggregate, {nullable:true})
    _count?: DiscountVoucherUserCountAggregate;

    @Field(() => DiscountVoucherUserMinAggregate, {nullable:true})
    _min?: DiscountVoucherUserMinAggregate;

    @Field(() => DiscountVoucherUserMaxAggregate, {nullable:true})
    _max?: DiscountVoucherUserMaxAggregate;
}
