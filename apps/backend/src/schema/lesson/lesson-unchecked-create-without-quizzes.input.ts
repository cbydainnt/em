import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentUncheckedCreateNestedManyWithoutLessonInput } from '../comment/comment-unchecked-create-nested-many-without-lesson.input';
import { NotificationUncheckedCreateNestedManyWithoutLessonInput } from '../notification/notification-unchecked-create-nested-many-without-lesson.input';
import { DocumentUncheckedCreateNestedManyWithoutLessonInput } from '../document/document-unchecked-create-nested-many-without-lesson.input';
import { UserLessonProgressUncheckedCreateNestedManyWithoutLessonInput } from '../user-lesson-progress/user-lesson-progress-unchecked-create-nested-many-without-lesson.input';
import { NoteUncheckedCreateNestedManyWithoutLessonInput } from '../note/note-unchecked-create-nested-many-without-lesson.input';
import { ReportUncheckedCreateNestedManyWithoutLessonInput } from '../report/report-unchecked-create-nested-many-without-lesson.input';

@InputType()
export class LessonUncheckedCreateWithoutQuizzesInput {

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

    @Field(() => String, {nullable:false})
    section_id!: string;

    @Field(() => CommentUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    comments?: CommentUncheckedCreateNestedManyWithoutLessonInput;

    @Field(() => NotificationUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    notifications?: NotificationUncheckedCreateNestedManyWithoutLessonInput;

    @Field(() => DocumentUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    documents?: DocumentUncheckedCreateNestedManyWithoutLessonInput;

    @Field(() => UserLessonProgressUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressUncheckedCreateNestedManyWithoutLessonInput;

    @Field(() => NoteUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    notes?: NoteUncheckedCreateNestedManyWithoutLessonInput;

    @Field(() => ReportUncheckedCreateNestedManyWithoutLessonInput, {nullable:true})
    reports?: ReportUncheckedCreateNestedManyWithoutLessonInput;
}
