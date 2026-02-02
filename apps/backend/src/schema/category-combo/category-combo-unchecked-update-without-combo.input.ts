import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class CategoryComboUncheckedUpdateWithoutComboInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    category_id?: StringFieldUpdateOperationsInput;
}
