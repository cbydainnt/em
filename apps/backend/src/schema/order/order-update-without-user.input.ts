import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { OrderItemUpdateManyWithoutOrderNestedInput } from '../order-item/order-item-update-many-without-order-nested.input';
import { DiscountVoucherUpdateOneWithoutOrderNestedInput } from '../discount-voucher/discount-voucher-update-one-without-order-nested.input';
import { DiscountVoucherUsageUpdateManyWithoutOrderNestedInput } from '../discount-voucher-usage/discount-voucher-usage-update-many-without-order-nested.input';

@InputType()
export class OrderUpdateWithoutUserInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    total_price?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    payment_method?: NullableIntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => OrderItemUpdateManyWithoutOrderNestedInput, {nullable:true})
    order_items?: OrderItemUpdateManyWithoutOrderNestedInput;

    @Field(() => DiscountVoucherUpdateOneWithoutOrderNestedInput, {nullable:true})
    discount_voucher?: DiscountVoucherUpdateOneWithoutOrderNestedInput;

    @Field(() => DiscountVoucherUsageUpdateManyWithoutOrderNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageUpdateManyWithoutOrderNestedInput;
}
