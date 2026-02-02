import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { LessonUpdateOneRequiredWithoutLesson_quizzesNestedInput } from '../lesson/lesson-update-one-required-without-lesson-quizzes-nested.input';

@InputType()
export class LessonQuizUpdateWithoutQuizInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    order?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => LessonUpdateOneRequiredWithoutLesson_quizzesNestedInput, {nullable:true})
    lesson?: LessonUpdateOneRequiredWithoutLesson_quizzesNestedInput;
}
