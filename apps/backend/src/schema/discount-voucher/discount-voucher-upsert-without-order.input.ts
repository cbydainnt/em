import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateWithoutOrderInput } from './discount-voucher-update-without-order.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutOrderInput } from './discount-voucher-create-without-order.input';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@InputType()
export class DiscountVoucherUpsertWithoutOrderInput {

    @Field(() => DiscountVoucherUpdateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutOrderInput)
    update!: DiscountVoucherUpdateWithoutOrderInput;

    @Field(() => DiscountVoucherCreateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutOrderInput)
    create!: DiscountVoucherCreateWithoutOrderInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
