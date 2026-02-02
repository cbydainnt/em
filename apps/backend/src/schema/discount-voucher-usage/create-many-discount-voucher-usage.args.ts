import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateManyInput } from './discount-voucher-usage-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDiscountVoucherUsageArgs {

    @Field(() => [DiscountVoucherUsageCreateManyInput], {nullable:false})
    @Type(() => DiscountVoucherUsageCreateManyInput)
    data!: Array<DiscountVoucherUsageCreateManyInput>;
}
