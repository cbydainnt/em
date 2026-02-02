import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherCreateManyInput } from './discount-voucher-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDiscountVoucherArgs {

    @Field(() => [DiscountVoucherCreateManyInput], {nullable:false})
    @Type(() => DiscountVoucherCreateManyInput)
    data!: Array<DiscountVoucherCreateManyInput>;
}
