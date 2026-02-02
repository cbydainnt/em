import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { CourseUpdateOneRequiredWithoutCart_itemsNestedInput } from '../course/course-update-one-required-without-cart-items-nested.input';

@InputType()
export class CartItemUpdateWithoutUserInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    added_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    selected?: BoolFieldUpdateOperationsInput;

    @Field(() => CourseUpdateOneRequiredWithoutCart_itemsNestedInput, {nullable:true})
    course?: CourseUpdateOneRequiredWithoutCart_itemsNestedInput;
}
