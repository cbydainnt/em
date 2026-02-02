import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { CategoryComboUncheckedUpdateManyWithoutComboNestedInput } from '../category-combo/category-combo-unchecked-update-many-without-combo-nested.input';
import { ComboCourseUncheckedUpdateManyWithoutComboNestedInput } from '../combo-course/combo-course-unchecked-update-many-without-combo-nested.input';
import { OrderItemUncheckedUpdateManyWithoutComboNestedInput } from '../order-item/order-item-unchecked-update-many-without-combo-nested.input';

@InputType()
export class ComboUncheckedUpdateWithoutDiscount_vouchersInput {

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

    @Field(() => CategoryComboUncheckedUpdateManyWithoutComboNestedInput, {nullable:true})
    categories?: CategoryComboUncheckedUpdateManyWithoutComboNestedInput;

    @Field(() => ComboCourseUncheckedUpdateManyWithoutComboNestedInput, {nullable:true})
    courses?: ComboCourseUncheckedUpdateManyWithoutComboNestedInput;

    @Field(() => OrderItemUncheckedUpdateManyWithoutComboNestedInput, {nullable:true})
    order_items?: OrderItemUncheckedUpdateManyWithoutComboNestedInput;
}
