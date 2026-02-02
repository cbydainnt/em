import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateInput } from './discount-voucher-item-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDiscountVoucherItemArgs {

    @Field(() => DiscountVoucherItemCreateInput, {nullable:false})
    @Type(() => DiscountVoucherItemCreateInput)
    data!: DiscountVoucherItemCreateInput;
}
