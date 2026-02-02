import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { GraphQLJSON } from 'graphql-type-json';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutUser_lesson_progressNestedInput } from '../user/user-update-one-required-without-user-lesson-progress-nested.input';
import { LessonUpdateOneRequiredWithoutUser_lesson_progressNestedInput } from '../lesson/lesson-update-one-required-without-user-lesson-progress-nested.input';

@InputType()
export class UserLessonProgressUpdateWithoutCourseInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    watched_seconds?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    completed?: IntFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    last_accessed?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => GraphQLJSON, {nullable:true})
    segments?: any;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutUser_lesson_progressNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUser_lesson_progressNestedInput;

    @Field(() => LessonUpdateOneRequiredWithoutUser_lesson_progressNestedInput, {nullable:true})
    lesson?: LessonUpdateOneRequiredWithoutUser_lesson_progressNestedInput;
}
