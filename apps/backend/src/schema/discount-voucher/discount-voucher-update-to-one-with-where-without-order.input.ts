import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUpdateWithoutOrderInput } from './discount-voucher-update-without-order.input';

@InputType()
export class DiscountVoucherUpdateToOneWithWhereWithoutOrderInput {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherUpdateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutOrderInput)
    data!: DiscountVoucherUpdateWithoutOrderInput;
}
