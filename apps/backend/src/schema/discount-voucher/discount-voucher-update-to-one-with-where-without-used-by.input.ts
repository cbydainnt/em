import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUpdateWithoutUsed_byInput } from './discount-voucher-update-without-used-by.input';

@InputType()
export class DiscountVoucherUpdateToOneWithWhereWithoutUsed_byInput {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherUpdateWithoutUsed_byInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutUsed_byInput)
    data!: DiscountVoucherUpdateWithoutUsed_byInput;
}
