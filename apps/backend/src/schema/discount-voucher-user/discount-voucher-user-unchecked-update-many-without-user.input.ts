import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class DiscountVoucherUserUncheckedUpdateManyWithoutUserInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    discount_voucher_id?: StringFieldUpdateOperationsInput;
}
