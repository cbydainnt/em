import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { QuizUpdateOneWithoutQuestionsNestedInput } from '../quiz/quiz-update-one-without-questions-nested.input';
import { QuizAudioUpdateOneWithoutQuestionsNestedInput } from '../quiz-audio/quiz-audio-update-one-without-questions-nested.input';
import { UserQuizAnswerUpdateManyWithoutQuestionNestedInput } from '../user-quiz-answer/user-quiz-answer-update-many-without-question-nested.input';
import { ReadingPassageUpdateOneWithoutQuestionsNestedInput } from '../reading-passage/reading-passage-update-one-without-questions-nested.input';

@InputType()
export class QuestionUpdateWithoutAnswersInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    question_text?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    question_image?: NullableStringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    question_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    order?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    points?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    difficulty?: IntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    explanation?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    audio_order?: NullableIntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => QuizUpdateOneWithoutQuestionsNestedInput, {nullable:true})
    quiz?: QuizUpdateOneWithoutQuestionsNestedInput;

    @Field(() => QuizAudioUpdateOneWithoutQuestionsNestedInput, {nullable:true})
    audio?: QuizAudioUpdateOneWithoutQuestionsNestedInput;

    @Field(() => UserQuizAnswerUpdateManyWithoutQuestionNestedInput, {nullable:true})
    user_answers?: UserQuizAnswerUpdateManyWithoutQuestionNestedInput;

    @Field(() => ReadingPassageUpdateOneWithoutQuestionsNestedInput, {nullable:true})
    reading_passage?: ReadingPassageUpdateOneWithoutQuestionsNestedInput;
}
