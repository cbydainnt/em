import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { DiscountVoucher } from '../discount-voucher/discount-voucher.model';
import { User } from '../user/user.model';
import { Order } from '../order/order.model';

@ObjectType()
export class DiscountVoucherUsage {

    @Field(() => ID, {nullable:false})
    voucher_usage_id!: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:true})
    order_id!: string | null;

    @Field(() => Date, {nullable:false})
    used_at!: Date;

    @Field(() => DiscountVoucher, {nullable:false})
    voucher?: DiscountVoucher;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Order, {nullable:true})
    order?: Order | null;
}
