import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateWithoutApplicable_itemsInput } from './discount-voucher-update-without-applicable-items.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutApplicable_itemsInput } from './discount-voucher-create-without-applicable-items.input';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@InputType()
export class DiscountVoucherUpsertWithoutApplicable_itemsInput {

    @Field(() => DiscountVoucherUpdateWithoutApplicable_itemsInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutApplicable_itemsInput)
    update!: DiscountVoucherUpdateWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherCreateWithoutApplicable_itemsInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutApplicable_itemsInput)
    create!: DiscountVoucherCreateWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
