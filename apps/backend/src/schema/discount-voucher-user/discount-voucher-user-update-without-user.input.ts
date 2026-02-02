import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput } from '../discount-voucher/discount-voucher-update-one-required-without-applicable-users-nested.input';

@InputType()
export class DiscountVoucherUserUpdateWithoutUserInput {

    @Field(() => DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput, {nullable:true})
    voucher?: DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput;
}
