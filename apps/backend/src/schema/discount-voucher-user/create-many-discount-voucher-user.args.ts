import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateManyInput } from './discount-voucher-user-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDiscountVoucherUserArgs {

    @Field(() => [DiscountVoucherUserCreateManyInput], {nullable:false})
    @Type(() => DiscountVoucherUserCreateManyInput)
    data!: Array<DiscountVoucherUserCreateManyInput>;
}
