import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { CourseUpdateOneRequiredWithoutCombosNestedInput } from '../course/course-update-one-required-without-combos-nested.input';

@InputType()
export class ComboCourseUpdateWithoutComboInput {

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => CourseUpdateOneRequiredWithoutCombosNestedInput, {nullable:true})
    course?: CourseUpdateOneRequiredWithoutCombosNestedInput;
}
