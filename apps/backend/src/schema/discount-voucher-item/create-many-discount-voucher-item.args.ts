import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateManyInput } from './discount-voucher-item-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDiscountVoucherItemArgs {

    @Field(() => [DiscountVoucherItemCreateManyInput], {nullable:false})
    @Type(() => DiscountVoucherItemCreateManyInput)
    data!: Array<DiscountVoucherItemCreateManyInput>;
}
