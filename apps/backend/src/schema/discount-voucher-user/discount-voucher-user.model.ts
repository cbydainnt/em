import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { DiscountVoucher } from '../discount-voucher/discount-voucher.model';
import { User } from '../user/user.model';

@ObjectType()
export class DiscountVoucherUser {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => DiscountVoucher, {nullable:false})
    voucher?: DiscountVoucher;

    @Field(() => User, {nullable:false})
    user?: User;
}
