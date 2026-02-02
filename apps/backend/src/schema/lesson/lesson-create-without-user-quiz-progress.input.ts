import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { SectionCreateNestedOneWithoutLessonsInput } from '../section/section-create-nested-one-without-lessons.input';
import { CommentCreateNestedManyWithoutLessonInput } from '../comment/comment-create-nested-many-without-lesson.input';
import { NotificationCreateNestedManyWithoutLessonInput } from '../notification/notification-create-nested-many-without-lesson.input';
import { DocumentCreateNestedManyWithoutLessonInput } from '../document/document-create-nested-many-without-lesson.input';
import { UserLessonProgressCreateNestedManyWithoutLessonInput } from '../user-lesson-progress/user-lesson-progress-create-nested-many-without-lesson.input';
import { NoteCreateNestedManyWithoutLessonInput } from '../note/note-create-nested-many-without-lesson.input';
import { ReportCreateNestedManyWithoutLessonInput } from '../report/report-create-nested-many-without-lesson.input';
import { LessonQuizCreateNestedManyWithoutLessonInput } from '../lesson-quiz/lesson-quiz-create-nested-many-without-lesson.input';

@InputType()
export class LessonCreateWithoutUser_quiz_progressInput {

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => String, {nullable:false})
    lesson_title!: string;

    @Field(() => Int, {nullable:true})
    lesson_type?: number;

    @Field(() => String, {nullable:true})
    lesson_video?: string;

    @Field(() => String, {nullable:true})
    lesson_thumbnail?: string;

    @Field(() => Int, {nullable:true})
    lesson_order?: number;

    @Field(() => Int, {nullable:false})
    minutes!: number;

    @Field(() => Int, {nullable:true})
    video_duration?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => SectionCreateNestedOneWithoutLessonsInput, {nullable:false})
    section!: SectionCreateNestedOneWithoutLessonsInput;

    @Field(() => CommentCreateNestedManyWithoutLessonInput, {nullable:true})
    comments?: CommentCreateNestedManyWithoutLessonInput;

    @Field(() => NotificationCreateNestedManyWithoutLessonInput, {nullable:true})
    notifications?: NotificationCreateNestedManyWithoutLessonInput;

    @Field(() => DocumentCreateNestedManyWithoutLessonInput, {nullable:true})
    documents?: DocumentCreateNestedManyWithoutLessonInput;

    @Field(() => UserLessonProgressCreateNestedManyWithoutLessonInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressCreateNestedManyWithoutLessonInput;

    @Field(() => NoteCreateNestedManyWithoutLessonInput, {nullable:true})
    notes?: NoteCreateNestedManyWithoutLessonInput;

    @Field(() => ReportCreateNestedManyWithoutLessonInput, {nullable:true})
    reports?: ReportCreateNestedManyWithoutLessonInput;

    @Field(() => LessonQuizCreateNestedManyWithoutLessonInput, {nullable:true})
    lesson_quizzes?: LessonQuizCreateNestedManyWithoutLessonInput;
}
