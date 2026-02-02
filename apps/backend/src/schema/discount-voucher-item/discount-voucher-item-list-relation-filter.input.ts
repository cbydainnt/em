import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';

@InputType()
export class DiscountVoucherItemListRelationFilter {

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    every?: DiscountVoucherItemWhereInput;

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    some?: DiscountVoucherItemWhereInput;

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    none?: DiscountVoucherItemWhereInput;
}
