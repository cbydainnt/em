import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateManyComboInput } from './discount-voucher-item-create-many-combo.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherItemCreateManyComboInputEnvelope {

    @Field(() => [DiscountVoucherItemCreateManyComboInput], {nullable:false})
    @Type(() => DiscountVoucherItemCreateManyComboInput)
    data!: Array<DiscountVoucherItemCreateManyComboInput>;
}
