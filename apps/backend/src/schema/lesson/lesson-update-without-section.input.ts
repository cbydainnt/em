import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { CommentUpdateManyWithoutLessonNestedInput } from '../comment/comment-update-many-without-lesson-nested.input';
import { NotificationUpdateManyWithoutLessonNestedInput } from '../notification/notification-update-many-without-lesson-nested.input';
import { DocumentUpdateManyWithoutLessonNestedInput } from '../document/document-update-many-without-lesson-nested.input';
import { UserLessonProgressUpdateManyWithoutLessonNestedInput } from '../user-lesson-progress/user-lesson-progress-update-many-without-lesson-nested.input';
import { UserQuizProgressUpdateManyWithoutLessonNestedInput } from '../user-quiz-progress/user-quiz-progress-update-many-without-lesson-nested.input';
import { NoteUpdateManyWithoutLessonNestedInput } from '../note/note-update-many-without-lesson-nested.input';
import { ReportUpdateManyWithoutLessonNestedInput } from '../report/report-update-many-without-lesson-nested.input';
import { LessonQuizUpdateManyWithoutLessonNestedInput } from '../lesson-quiz/lesson-quiz-update-many-without-lesson-nested.input';

@InputType()
export class LessonUpdateWithoutSectionInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    lesson_title?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    lesson_type?: IntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lesson_video?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lesson_thumbnail?: NullableStringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    lesson_order?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    minutes?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    video_duration?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    access_type?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    created_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updated_at?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    created_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    updated_by?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    del_flg?: BoolFieldUpdateOperationsInput;

    @Field(() => CommentUpdateManyWithoutLessonNestedInput, {nullable:true})
    comments?: CommentUpdateManyWithoutLessonNestedInput;

    @Field(() => NotificationUpdateManyWithoutLessonNestedInput, {nullable:true})
    notifications?: NotificationUpdateManyWithoutLessonNestedInput;

    @Field(() => DocumentUpdateManyWithoutLessonNestedInput, {nullable:true})
    documents?: DocumentUpdateManyWithoutLessonNestedInput;

    @Field(() => UserLessonProgressUpdateManyWithoutLessonNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUpdateManyWithoutLessonNestedInput;

    @Field(() => UserQuizProgressUpdateManyWithoutLessonNestedInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressUpdateManyWithoutLessonNestedInput;

    @Field(() => NoteUpdateManyWithoutLessonNestedInput, {nullable:true})
    notes?: NoteUpdateManyWithoutLessonNestedInput;

    @Field(() => ReportUpdateManyWithoutLessonNestedInput, {nullable:true})
    reports?: ReportUpdateManyWithoutLessonNestedInput;

    @Field(() => LessonQuizUpdateManyWithoutLessonNestedInput, {nullable:true})
    lesson_quizzes?: LessonQuizUpdateManyWithoutLessonNestedInput;
}
