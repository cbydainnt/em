import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DiscountVoucherItemCountAggregate } from './discount-voucher-item-count-aggregate.output';
import { DiscountVoucherItemMinAggregate } from './discount-voucher-item-min-aggregate.output';
import { DiscountVoucherItemMaxAggregate } from './discount-voucher-item-max-aggregate.output';

@ObjectType()
export class DiscountVoucherItemGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => DiscountVoucherItemCountAggregate, {nullable:true})
    _count?: DiscountVoucherItemCountAggregate;

    @Field(() => DiscountVoucherItemMinAggregate, {nullable:true})
    _min?: DiscountVoucherItemMinAggregate;

    @Field(() => DiscountVoucherItemMaxAggregate, {nullable:true})
    _max?: DiscountVoucherItemMaxAggregate;
}
