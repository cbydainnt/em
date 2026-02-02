import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class CategoryComboUncheckedUpdateManyWithoutCategoryInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    combo_id?: StringFieldUpdateOperationsInput;
}
