import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateManyUserInput } from './discount-voucher-user-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherUserCreateManyUserInputEnvelope {

    @Field(() => [DiscountVoucherUserCreateManyUserInput], {nullable:false})
    @Type(() => DiscountVoucherUserCreateManyUserInput)
    data!: Array<DiscountVoucherUserCreateManyUserInput>;
}
