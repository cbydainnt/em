import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyDiscountVoucherArgs {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
