import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@InputType()
export class DiscountVoucherRelationFilter {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    is?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    isNot?: DiscountVoucherWhereInput;
}
