import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';

@InputType()
export class DiscountVoucherItemUncheckedUpdateWithoutVoucherInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    course_id?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    combo_id?: NullableStringFieldUpdateOperationsInput;
}
