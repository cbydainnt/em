import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneWithoutCourse_viewNestedInput } from '../user/user-update-one-without-course-view-nested.input';

@InputType()
export class CourseViewUpdateWithoutCourseInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    ip_address?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    user_agent?: NullableStringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneWithoutCourse_viewNestedInput, {nullable:true})
    user?: UserUpdateOneWithoutCourse_viewNestedInput;
}
