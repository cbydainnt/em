import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput } from '../discount-voucher/discount-voucher-update-one-required-without-used-by-nested.input';
import { UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput } from '../user/user-update-one-required-without-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherUsageUpdateWithoutOrderInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    used_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput, {nullable:true})
    voucher?: DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput;

    @Field(() => UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput;
}
