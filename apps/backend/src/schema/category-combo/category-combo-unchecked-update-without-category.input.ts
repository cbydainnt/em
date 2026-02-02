import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class CategoryComboUncheckedUpdateWithoutCategoryInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    combo_id?: StringFieldUpdateOperationsInput;
}
