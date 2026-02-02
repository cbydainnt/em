import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { SectionRelationFilter } from '../section/section-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { NotificationListRelationFilter } from '../notification/notification-list-relation-filter.input';
import { DocumentListRelationFilter } from '../document/document-list-relation-filter.input';
import { UserLessonProgressListRelationFilter } from '../user-lesson-progress/user-lesson-progress-list-relation-filter.input';
import { UserQuizProgressListRelationFilter } from '../user-quiz-progress/user-quiz-progress-list-relation-filter.input';
import { NoteListRelationFilter } from '../note/note-list-relation-filter.input';
import { ReportListRelationFilter } from '../report/report-list-relation-filter.input';
import { LessonQuizListRelationFilter } from '../lesson-quiz/lesson-quiz-list-relation-filter.input';

@InputType()
export class LessonWhereInput {

    @Field(() => [LessonWhereInput], {nullable:true})
    AND?: Array<LessonWhereInput>;

    @Field(() => [LessonWhereInput], {nullable:true})
    OR?: Array<LessonWhereInput>;

    @Field(() => [LessonWhereInput], {nullable:true})
    NOT?: Array<LessonWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_title?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    lesson_type?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_video?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_thumbnail?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    lesson_order?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    minutes?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    video_duration?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    access_type?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => StringFilter, {nullable:true})
    section_id?: StringFilter;

    @Field(() => SectionRelationFilter, {nullable:true})
    section?: SectionRelationFilter;

    @Field(() => CommentListRelationFilter, {nullable:true})
    comments?: CommentListRelationFilter;

    @Field(() => NotificationListRelationFilter, {nullable:true})
    notifications?: NotificationListRelationFilter;

    @Field(() => DocumentListRelationFilter, {nullable:true})
    documents?: DocumentListRelationFilter;

    @Field(() => UserLessonProgressListRelationFilter, {nullable:true})
    user_lesson_progress?: UserLessonProgressListRelationFilter;

    @Field(() => UserQuizProgressListRelationFilter, {nullable:true})
    user_quiz_progress?: UserQuizProgressListRelationFilter;

    @Field(() => NoteListRelationFilter, {nullable:true})
    notes?: NoteListRelationFilter;

    @Field(() => ReportListRelationFilter, {nullable:true})
    reports?: ReportListRelationFilter;

    @Field(() => LessonQuizListRelationFilter, {nullable:true})
    lesson_quizzes?: LessonQuizListRelationFilter;
}
