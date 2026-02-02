import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateInput } from './discount-voucher-user-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserCreateInput, {nullable:false})
    @Type(() => DiscountVoucherUserCreateInput)
    data!: DiscountVoucherUserCreateInput;
}
