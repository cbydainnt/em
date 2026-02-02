import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { CourseUpdateOneRequiredWithoutCourse_viewNestedInput } from '../course/course-update-one-required-without-course-view-nested.input';

@InputType()
export class CourseViewUpdateWithoutUserInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    ip_address?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    user_agent?: NullableStringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => CourseUpdateOneRequiredWithoutCourse_viewNestedInput, {nullable:true})
    course?: CourseUpdateOneRequiredWithoutCourse_viewNestedInput;
}
