import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUpdateWithoutApplicable_itemsInput } from './discount-voucher-update-without-applicable-items.input';

@InputType()
export class DiscountVoucherUpdateToOneWithWhereWithoutApplicable_itemsInput {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherUpdateWithoutApplicable_itemsInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutApplicable_itemsInput)
    data!: DiscountVoucherUpdateWithoutApplicable_itemsInput;
}
