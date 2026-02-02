import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SectionOrderByWithRelationInput } from '../section/section-order-by-with-relation.input';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';
import { NotificationOrderByRelationAggregateInput } from '../notification/notification-order-by-relation-aggregate.input';
import { DocumentOrderByRelationAggregateInput } from '../document/document-order-by-relation-aggregate.input';
import { UserLessonProgressOrderByRelationAggregateInput } from '../user-lesson-progress/user-lesson-progress-order-by-relation-aggregate.input';
import { UserQuizProgressOrderByRelationAggregateInput } from '../user-quiz-progress/user-quiz-progress-order-by-relation-aggregate.input';
import { NoteOrderByRelationAggregateInput } from '../note/note-order-by-relation-aggregate.input';
import { ReportOrderByRelationAggregateInput } from '../report/report-order-by-relation-aggregate.input';
import { LessonQuizOrderByRelationAggregateInput } from '../lesson-quiz/lesson-quiz-order-by-relation-aggregate.input';

@InputType()
export class LessonOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_video?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_thumbnail?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minutes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    video_duration?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    section_id?: keyof typeof SortOrder;

    @Field(() => SectionOrderByWithRelationInput, {nullable:true})
    section?: SectionOrderByWithRelationInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    comments?: CommentOrderByRelationAggregateInput;

    @Field(() => NotificationOrderByRelationAggregateInput, {nullable:true})
    notifications?: NotificationOrderByRelationAggregateInput;

    @Field(() => DocumentOrderByRelationAggregateInput, {nullable:true})
    documents?: DocumentOrderByRelationAggregateInput;

    @Field(() => UserLessonProgressOrderByRelationAggregateInput, {nullable:true})
    user_lesson_progress?: UserLessonProgressOrderByRelationAggregateInput;

    @Field(() => UserQuizProgressOrderByRelationAggregateInput, {nullable:true})
    user_quiz_progress?: UserQuizProgressOrderByRelationAggregateInput;

    @Field(() => NoteOrderByRelationAggregateInput, {nullable:true})
    notes?: NoteOrderByRelationAggregateInput;

    @Field(() => ReportOrderByRelationAggregateInput, {nullable:true})
    reports?: ReportOrderByRelationAggregateInput;

    @Field(() => LessonQuizOrderByRelationAggregateInput, {nullable:true})
    lesson_quizzes?: LessonQuizOrderByRelationAggregateInput;
}
