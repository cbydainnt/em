import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateInput } from './discount-voucher-usage-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDiscountVoucherUsageArgs {

    @Field(() => DiscountVoucherUsageCreateInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateInput)
    data!: DiscountVoucherUsageCreateInput;
}
