import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateWithoutUsed_byInput } from './discount-voucher-update-without-used-by.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutUsed_byInput } from './discount-voucher-create-without-used-by.input';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@InputType()
export class DiscountVoucherUpsertWithoutUsed_byInput {

    @Field(() => DiscountVoucherUpdateWithoutUsed_byInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutUsed_byInput)
    update!: DiscountVoucherUpdateWithoutUsed_byInput;

    @Field(() => DiscountVoucherCreateWithoutUsed_byInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutUsed_byInput)
    create!: DiscountVoucherCreateWithoutUsed_byInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
