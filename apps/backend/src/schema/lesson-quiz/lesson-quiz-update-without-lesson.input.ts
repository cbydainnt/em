import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { QuizUpdateOneRequiredWithoutQuiz_lessonsNestedInput } from '../quiz/quiz-update-one-required-without-quiz-lessons-nested.input';

@InputType()
export class LessonQuizUpdateWithoutLessonInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    order?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => QuizUpdateOneRequiredWithoutQuiz_lessonsNestedInput, {nullable:true})
    quiz?: QuizUpdateOneRequiredWithoutQuiz_lessonsNestedInput;
}
