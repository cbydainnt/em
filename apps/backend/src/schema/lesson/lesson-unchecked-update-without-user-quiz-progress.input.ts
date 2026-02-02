import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { CommentUncheckedUpdateManyWithoutLessonNestedInput } from '../comment/comment-unchecked-update-many-without-lesson-nested.input';
import { NotificationUncheckedUpdateManyWithoutLessonNestedInput } from '../notification/notification-unchecked-update-many-without-lesson-nested.input';
import { DocumentUncheckedUpdateManyWithoutLessonNestedInput } from '../document/document-unchecked-update-many-without-lesson-nested.input';
import { UserLessonProgressUncheckedUpdateManyWithoutLessonNestedInput } from '../user-lesson-progress/user-lesson-progress-unchecked-update-many-without-lesson-nested.input';
import { NoteUncheckedUpdateManyWithoutLessonNestedInput } from '../note/note-unchecked-update-many-without-lesson-nested.input';
import { ReportUncheckedUpdateManyWithoutLessonNestedInput } from '../report/report-unchecked-update-many-without-lesson-nested.input';
import { LessonQuizUncheckedUpdateManyWithoutLessonNestedInput } from '../lesson-quiz/lesson-quiz-unchecked-update-many-without-lesson-nested.input';

@InputType()
export class LessonUncheckedUpdateWithoutUser_quiz_progressInput {

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

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    section_id?: StringFieldUpdateOperationsInput;

    @Field(() => CommentUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    comments?: CommentUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => NotificationUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    notifications?: NotificationUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => DocumentUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    documents?: DocumentUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => UserLessonProgressUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => NoteUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    notes?: NoteUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => ReportUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    reports?: ReportUncheckedUpdateManyWithoutLessonNestedInput;

    @Field(() => LessonQuizUncheckedUpdateManyWithoutLessonNestedInput, {nullable:true})
    lesson_quizzes?: LessonQuizUncheckedUpdateManyWithoutLessonNestedInput;
}
