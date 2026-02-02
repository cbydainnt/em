import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderItem } from '../order-item/order-item.model';
import { User } from '../user/user.model';
import { DiscountVoucher } from '../discount-voucher/discount-voucher.model';
import { DiscountVoucherUsage } from '../discount-voucher-usage/discount-voucher-usage.model';
import { OrderCount } from './order-count.output';

@ObjectType()
export class Order {

    @Field(() => ID, {nullable:false})
    order_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => Int, {nullable:false})
    total_price!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Int, {nullable:true,defaultValue:1})
    payment_method!: number | null;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:true})
    updated_at!: Date | null;

    @Field(() => String, {nullable:true})
    discount_voucher_id!: string | null;

    @Field(() => [OrderItem], {nullable:true})
    order_items?: Array<OrderItem>;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => DiscountVoucher, {nullable:true})
    discount_voucher?: DiscountVoucher | null;

    @Field(() => [DiscountVoucherUsage], {nullable:true})
    discount_vouchers?: Array<DiscountVoucherUsage>;

    @Field(() => OrderCount, {nullable:false})
    _count?: OrderCount;
}
