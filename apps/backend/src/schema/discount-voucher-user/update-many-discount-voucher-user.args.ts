import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserUncheckedUpdateManyInput } from './discount-voucher-user-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';

@ArgsType()
export class UpdateManyDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserUncheckedUpdateManyInput, {nullable:false})
    @Type(() => DiscountVoucherUserUncheckedUpdateManyInput)
    data!: DiscountVoucherUserUncheckedUpdateManyInput;

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUserWhereInput)
    where?: DiscountVoucherUserWhereInput;
}
