import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput } from '../discount-voucher/discount-voucher-update-one-required-without-applicable-users-nested.input';
import { UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput } from '../user/user-update-one-required-without-allowed-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherUserUpdateInput {

    @Field(() => DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput, {nullable:true})
    voucher?: DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput;

    @Field(() => UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput;
}
