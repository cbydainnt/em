import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyDiscountVoucherItemArgs {

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    @Type(() => DiscountVoucherItemWhereInput)
    where?: DiscountVoucherItemWhereInput;
}
