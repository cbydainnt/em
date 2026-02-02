import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateNestedOneWithoutApplicable_usersInput } from '../discount-voucher/discount-voucher-create-nested-one-without-applicable-users.input';
import { UserCreateNestedOneWithoutAllowed_discount_vouchersInput } from '../user/user-create-nested-one-without-allowed-discount-vouchers.input';

@InputType()
export class DiscountVoucherUserCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherCreateNestedOneWithoutApplicable_usersInput, {nullable:false})
    voucher!: DiscountVoucherCreateNestedOneWithoutApplicable_usersInput;

    @Field(() => UserCreateNestedOneWithoutAllowed_discount_vouchersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutAllowed_discount_vouchersInput;
}
