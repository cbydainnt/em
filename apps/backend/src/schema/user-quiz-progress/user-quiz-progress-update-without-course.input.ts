import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableFloatFieldUpdateOperationsInput } from '../prisma/nullable-float-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutQuiz_progressNestedInput } from '../user/user-update-one-required-without-quiz-progress-nested.input';
import { QuizUpdateOneRequiredWithoutUser_progressNestedInput } from '../quiz/quiz-update-one-required-without-user-progress-nested.input';
import { UserQuizAnswerUpdateManyWithoutProgressNestedInput } from '../user-quiz-answer/user-quiz-answer-update-many-without-progress-nested.input';
import { LessonUpdateOneWithoutUser_quiz_progressNestedInput } from '../lesson/lesson-update-one-without-user-quiz-progress-nested.input';

@InputType()
export class UserQuizProgressUpdateWithoutCourseInput {

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    score?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    percentage?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    total_questions?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    correct_answers?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    passed?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    time_spent?: NullableIntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    started_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    completed_at?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    attempts?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutQuiz_progressNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutQuiz_progressNestedInput;

    @Field(() => QuizUpdateOneRequiredWithoutUser_progressNestedInput, {nullable:true})
    quiz?: QuizUpdateOneRequiredWithoutUser_progressNestedInput;

    @Field(() => UserQuizAnswerUpdateManyWithoutProgressNestedInput, {nullable:true})
    answers?: UserQuizAnswerUpdateManyWithoutProgressNestedInput;

    @Field(() => LessonUpdateOneWithoutUser_quiz_progressNestedInput, {nullable:true})
    lesson?: LessonUpdateOneWithoutUser_quiz_progressNestedInput;
}
