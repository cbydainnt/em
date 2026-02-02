import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';

@InputType()
export class DiscountVoucherUsageUpdateManyMutationInput {

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    used_at?: DateTimeFieldUpdateOperationsInput;
}
