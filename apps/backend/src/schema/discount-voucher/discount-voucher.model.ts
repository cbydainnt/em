import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherItem } from '../discount-voucher-item/discount-voucher-item.model';
import { DiscountVoucherUser } from '../discount-voucher-user/discount-voucher-user.model';
import { DiscountVoucherUsage } from '../discount-voucher-usage/discount-voucher-usage.model';
import { Order } from '../order/order.model';
import { DiscountVoucherCount } from './discount-voucher-count.output';

@ObjectType()
export class DiscountVoucher {

    @Field(() => ID, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    discount_type!: number;

    @Field(() => Int, {nullable:false})
    discount_value!: number;

    @Field(() => Int, {nullable:true})
    min_order_amount!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    applicable_type!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    user_scope!: number;

    @Field(() => Date, {nullable:false})
    start_date!: Date;

    @Field(() => Date, {nullable:true})
    end_date!: Date | null;

    @Field(() => Int, {nullable:true})
    usage_limit!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    used_count!: number;

    @Field(() => Int, {nullable:true,defaultValue:1})
    per_user_limit!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:true})
    updated_at!: Date | null;

    @Field(() => [DiscountVoucherItem], {nullable:true})
    applicable_items?: Array<DiscountVoucherItem>;

    @Field(() => [DiscountVoucherUser], {nullable:true})
    applicable_users?: Array<DiscountVoucherUser>;

    @Field(() => [DiscountVoucherUsage], {nullable:true})
    used_by?: Array<DiscountVoucherUsage>;

    @Field(() => [Order], {nullable:true})
    order?: Array<Order>;

    @Field(() => DiscountVoucherCount, {nullable:false})
    _count?: DiscountVoucherCount;
}
