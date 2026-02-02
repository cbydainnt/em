import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput } from '../discount-voucher/discount-voucher-update-one-required-without-used-by-nested.input';
import { OrderUpdateOneWithoutDiscount_vouchersNestedInput } from '../order/order-update-one-without-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherUsageUpdateWithoutUserInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    used_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput, {nullable:true})
    voucher?: DiscountVoucherUpdateOneRequiredWithoutUsed_byNestedInput;

    @Field(() => OrderUpdateOneWithoutDiscount_vouchersNestedInput, {nullable:true})
    order?: OrderUpdateOneWithoutDiscount_vouchersNestedInput;
}
