import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { CourseUpdateOneWithoutQuizzesNestedInput } from '../course/course-update-one-without-quizzes-nested.input';
import { QuestionUpdateManyWithoutQuizNestedInput } from '../question/question-update-many-without-quiz-nested.input';
import { QuizAudioUpdateManyWithoutQuizNestedInput } from '../quiz-audio/quiz-audio-update-many-without-quiz-nested.input';
import { QuizUpdateOneWithoutQuiz_versionsNestedInput } from './quiz-update-one-without-quiz-versions-nested.input';
import { QuizUpdateManyWithoutParent_quizNestedInput } from './quiz-update-many-without-parent-quiz-nested.input';
import { LessonQuizUpdateManyWithoutQuizNestedInput } from '../lesson-quiz/lesson-quiz-update-many-without-quiz-nested.input';

@InputType()
export class QuizUpdateWithoutUser_progressInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quiz_type?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    question_count?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    total_questions?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    total_points?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    passing_score?: IntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    duration_minutes?: NullableIntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    difficulty_level?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    version?: IntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    is_latest_version?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    version_notes?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    has_audio?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    show_explanation?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    randomize_questions?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    randomize_answers?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    allow_review?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    max_attempts?: NullableIntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    allow_retake?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    show_results?: BoolFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    status?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lesson_id?: NullableStringFieldUpdateOperationsInput;

    @Field(() => CourseUpdateOneWithoutQuizzesNestedInput, {nullable:true})
    course?: CourseUpdateOneWithoutQuizzesNestedInput;

    @Field(() => QuestionUpdateManyWithoutQuizNestedInput, {nullable:true})
    questions?: QuestionUpdateManyWithoutQuizNestedInput;

    @Field(() => QuizAudioUpdateManyWithoutQuizNestedInput, {nullable:true})
    audios?: QuizAudioUpdateManyWithoutQuizNestedInput;

    @Field(() => QuizUpdateOneWithoutQuiz_versionsNestedInput, {nullable:true})
    parent_quiz?: QuizUpdateOneWithoutQuiz_versionsNestedInput;

    @Field(() => QuizUpdateManyWithoutParent_quizNestedInput, {nullable:true})
    quiz_versions?: QuizUpdateManyWithoutParent_quizNestedInput;

    @Field(() => LessonQuizUpdateManyWithoutQuizNestedInput, {nullable:true})
    quiz_lessons?: LessonQuizUpdateManyWithoutQuizNestedInput;
}
