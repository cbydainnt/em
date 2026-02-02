import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateManyOrderInput } from './discount-voucher-usage-create-many-order.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherUsageCreateManyOrderInputEnvelope {

    @Field(() => [DiscountVoucherUsageCreateManyOrderInput], {nullable:false})
    @Type(() => DiscountVoucherUsageCreateManyOrderInput)
    data!: Array<DiscountVoucherUsageCreateManyOrderInput>;
}
