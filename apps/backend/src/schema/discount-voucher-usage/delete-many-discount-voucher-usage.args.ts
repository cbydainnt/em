import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyDiscountVoucherUsageArgs {

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUsageWhereInput)
    where?: DiscountVoucherUsageWhereInput;
}
