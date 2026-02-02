import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';

@InputType()
export class DiscountVoucherUserListRelationFilter {

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    every?: DiscountVoucherUserWhereInput;

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    some?: DiscountVoucherUserWhereInput;

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    none?: DiscountVoucherUserWhereInput;
}
