import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutAllowed_discount_vouchersInput } from '../user/user-create-nested-one-without-allowed-discount-vouchers.input';

@InputType()
export class DiscountVoucherUserCreateWithoutVoucherInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserCreateNestedOneWithoutAllowed_discount_vouchersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutAllowed_discount_vouchersInput;
}
