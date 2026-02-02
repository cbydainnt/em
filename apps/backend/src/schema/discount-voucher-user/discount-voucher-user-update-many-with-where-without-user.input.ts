import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserScalarWhereInput } from './discount-voucher-user-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserUncheckedUpdateManyWithoutUserInput } from './discount-voucher-user-unchecked-update-many-without-user.input';

@InputType()
export class DiscountVoucherUserUpdateManyWithWhereWithoutUserInput {

    @Field(() => DiscountVoucherUserScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherUserScalarWhereInput)
    where!: DiscountVoucherUserScalarWhereInput;

    @Field(() => DiscountVoucherUserUncheckedUpdateManyWithoutUserInput, {nullable:false})
    @Type(() => DiscountVoucherUserUncheckedUpdateManyWithoutUserInput)
    data!: DiscountVoucherUserUncheckedUpdateManyWithoutUserInput;
}
