import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { ComboUpdateOneRequiredWithoutCoursesNestedInput } from '../combo/combo-update-one-required-without-courses-nested.input';
import { CourseUpdateOneRequiredWithoutCombosNestedInput } from '../course/course-update-one-required-without-combos-nested.input';

@InputType()
export class ComboCourseUpdateInput {

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => ComboUpdateOneRequiredWithoutCoursesNestedInput, {nullable:true})
    combo?: ComboUpdateOneRequiredWithoutCoursesNestedInput;

    @Field(() => CourseUpdateOneRequiredWithoutCombosNestedInput, {nullable:true})
    course?: CourseUpdateOneRequiredWithoutCombosNestedInput;
}
