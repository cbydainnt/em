import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { ComboUpdateOneWithoutOrder_itemsNestedInput } from '../combo/combo-update-one-without-order-items-nested.input';
import { CourseUpdateOneWithoutOrder_itemsNestedInput } from '../course/course-update-one-without-order-items-nested.input';

@InputType()
export class OrderItemUpdateWithoutOrderInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    item_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    final_price?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => ComboUpdateOneWithoutOrder_itemsNestedInput, {nullable:true})
    combo?: ComboUpdateOneWithoutOrder_itemsNestedInput;

    @Field(() => CourseUpdateOneWithoutOrder_itemsNestedInput, {nullable:true})
    course?: CourseUpdateOneWithoutOrder_itemsNestedInput;
}
