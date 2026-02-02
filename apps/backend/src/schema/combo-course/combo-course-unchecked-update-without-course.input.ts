import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';

@InputType()
export class ComboCourseUncheckedUpdateWithoutCourseInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    combo_id?: StringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;
}
