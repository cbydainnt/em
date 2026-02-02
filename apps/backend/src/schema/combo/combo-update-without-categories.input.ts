import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { ComboCourseUpdateManyWithoutComboNestedInput } from '../combo-course/combo-course-update-many-without-combo-nested.input';
import { OrderItemUpdateManyWithoutComboNestedInput } from '../order-item/order-item-update-many-without-combo-nested.input';
import { DiscountVoucherItemUpdateManyWithoutComboNestedInput } from '../discount-voucher-item/discount-voucher-item-update-many-without-combo-nested.input';

@InputType()
export class ComboUpdateWithoutCategoriesInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    combo_name?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    combo_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    original_price?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: IntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    created_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    updated_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => ComboCourseUpdateManyWithoutComboNestedInput, {nullable:true})
    courses?: ComboCourseUpdateManyWithoutComboNestedInput;

    @Field(() => OrderItemUpdateManyWithoutComboNestedInput, {nullable:true})
    order_items?: OrderItemUpdateManyWithoutComboNestedInput;

    @Field(() => DiscountVoucherItemUpdateManyWithoutComboNestedInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemUpdateManyWithoutComboNestedInput;
}
