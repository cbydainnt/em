import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';

@InputType()
export class DiscountVoucherItemUncheckedUpdateManyWithoutComboInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    discount_voucher_id?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    course_id?: NullableStringFieldUpdateOperationsInput;
}
