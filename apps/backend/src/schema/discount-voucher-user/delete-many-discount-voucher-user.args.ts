import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUserWhereInput)
    where?: DiscountVoucherUserWhereInput;
}
