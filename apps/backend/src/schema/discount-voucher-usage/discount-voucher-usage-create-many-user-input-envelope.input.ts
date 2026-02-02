import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateManyUserInput } from './discount-voucher-usage-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherUsageCreateManyUserInputEnvelope {

    @Field(() => [DiscountVoucherUsageCreateManyUserInput], {nullable:false})
    @Type(() => DiscountVoucherUsageCreateManyUserInput)
    data!: Array<DiscountVoucherUsageCreateManyUserInput>;
}
