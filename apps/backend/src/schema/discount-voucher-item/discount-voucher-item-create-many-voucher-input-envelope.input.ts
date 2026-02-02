import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateManyVoucherInput } from './discount-voucher-item-create-many-voucher.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherItemCreateManyVoucherInputEnvelope {

    @Field(() => [DiscountVoucherItemCreateManyVoucherInput], {nullable:false})
    @Type(() => DiscountVoucherItemCreateManyVoucherInput)
    data!: Array<DiscountVoucherItemCreateManyVoucherInput>;
}
