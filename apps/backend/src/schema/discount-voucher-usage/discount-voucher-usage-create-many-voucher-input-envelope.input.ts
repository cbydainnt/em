import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateManyVoucherInput } from './discount-voucher-usage-create-many-voucher.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherUsageCreateManyVoucherInputEnvelope {

    @Field(() => [DiscountVoucherUsageCreateManyVoucherInput], {nullable:false})
    @Type(() => DiscountVoucherUsageCreateManyVoucherInput)
    data!: Array<DiscountVoucherUsageCreateManyVoucherInput>;
}
