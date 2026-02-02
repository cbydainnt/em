import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';

@InputType()
export class CartItemUpdateManyMutationInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    added_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    selected?: BoolFieldUpdateOperationsInput;
}
