import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserScalarWhereInput } from './discount-voucher-user-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserUncheckedUpdateManyWithoutVoucherInput } from './discount-voucher-user-unchecked-update-many-without-voucher.input';

@InputType()
export class DiscountVoucherUserUpdateManyWithWhereWithoutVoucherInput {

    @Field(() => DiscountVoucherUserScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherUserScalarWhereInput)
    where!: DiscountVoucherUserScalarWhereInput;

    @Field(() => DiscountVoucherUserUncheckedUpdateManyWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUserUncheckedUpdateManyWithoutVoucherInput)
    data!: DiscountVoucherUserUncheckedUpdateManyWithoutVoucherInput;
}
