import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';

@InputType()
export class DiscountVoucherUsageListRelationFilter {

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    every?: DiscountVoucherUsageWhereInput;

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    some?: DiscountVoucherUsageWhereInput;

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    none?: DiscountVoucherUsageWhereInput;
}
