import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput } from '../user/user-update-one-required-without-discount-vouchers-nested.input';
import { OrderUpdateOneWithoutDiscount_vouchersNestedInput } from '../order/order-update-one-without-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherUsageUpdateWithoutVoucherInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    used_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput;

    @Field(() => OrderUpdateOneWithoutDiscount_vouchersNestedInput, {nullable:true})
    order?: OrderUpdateOneWithoutDiscount_vouchersNestedInput;
}
