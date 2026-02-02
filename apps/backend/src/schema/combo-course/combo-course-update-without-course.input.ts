import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { ComboUpdateOneRequiredWithoutCoursesNestedInput } from '../combo/combo-update-one-required-without-courses-nested.input';

@InputType()
export class ComboCourseUpdateWithoutCourseInput {

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => ComboUpdateOneRequiredWithoutCoursesNestedInput, {nullable:true})
    combo?: ComboUpdateOneRequiredWithoutCoursesNestedInput;
}
