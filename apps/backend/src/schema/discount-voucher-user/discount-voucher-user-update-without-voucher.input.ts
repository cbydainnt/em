import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput } from '../user/user-update-one-required-without-allowed-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherUserUpdateWithoutVoucherInput {

    @Field(() => UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutAllowed_discount_vouchersNestedInput;
}
