import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { DiscountVoucherItemUpdateManyWithoutVoucherNestedInput } from '../discount-voucher-item/discount-voucher-item-update-many-without-voucher-nested.input';
import { DiscountVoucherUserUpdateManyWithoutVoucherNestedInput } from '../discount-voucher-user/discount-voucher-user-update-many-without-voucher-nested.input';
import { OrderUpdateManyWithoutDiscount_voucherNestedInput } from '../order/order-update-many-without-discount-voucher-nested.input';

@InputType()
export class DiscountVoucherUpdateWithoutUsed_byInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    code?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    discount_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    discount_value?: IntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    min_order_amount?: NullableIntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    applicable_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    user_scope?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    start_date?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    end_date?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    usage_limit?: NullableIntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    used_count?: IntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    per_user_limit?: NullableIntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => DiscountVoucherItemUpdateManyWithoutVoucherNestedInput, {nullable:true})
    applicable_items?: DiscountVoucherItemUpdateManyWithoutVoucherNestedInput;

    @Field(() => DiscountVoucherUserUpdateManyWithoutVoucherNestedInput, {nullable:true})
    applicable_users?: DiscountVoucherUserUpdateManyWithoutVoucherNestedInput;

    @Field(() => OrderUpdateManyWithoutDiscount_voucherNestedInput, {nullable:true})
    order?: OrderUpdateManyWithoutDiscount_voucherNestedInput;
}
