import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherCreateInput } from './discount-voucher-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDiscountVoucherArgs {

    @Field(() => DiscountVoucherCreateInput, {nullable:false})
    @Type(() => DiscountVoucherCreateInput)
    data!: DiscountVoucherCreateInput;
}
