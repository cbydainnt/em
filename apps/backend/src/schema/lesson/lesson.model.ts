import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Section } from '../section/section.model';
import { Comment } from '../comment/comment.model';
import { Notification } from '../notification/notification.model';
import { Document } from '../document/document.model';
import { UserLessonProgress } from '../user-lesson-progress/user-lesson-progress.model';
import { UserQuizProgress } from '../user-quiz-progress/user-quiz-progress.model';
import { Note } from '../note/note.model';
import { Report } from '../report/report.model';
import { LessonQuiz } from '../lesson-quiz/lesson-quiz.model';
import { LessonCount } from './lesson-count.output';

@ObjectType()
export class Lesson {

    @Field(() => ID, {nullable:false})
    lesson_id!: string;

    @Field(() => String, {nullable:false})
    lesson_title!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    lesson_type!: number;

    @Field(() => String, {nullable:true})
    lesson_video!: string | null;

    @Field(() => String, {nullable:true})
    lesson_thumbnail!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    lesson_order!: number;

    @Field(() => Int, {nullable:false})
    minutes!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    video_duration!: number;

    @Field(() => Int, {nullable:false,defaultValue:3})
    access_type!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:false})
    section_id!: string;

    @Field(() => Section, {nullable:false})
    section?: Section;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => [Notification], {nullable:true})
    notifications?: Array<Notification>;

    @Field(() => [Document], {nullable:true})
    documents?: Array<Document>;

    @Field(() => [UserLessonProgress], {nullable:true})
    user_lesson_progress?: Array<UserLessonProgress>;

    @Field(() => [UserQuizProgress], {nullable:true})
    user_quiz_progress?: Array<UserQuizProgress>;

    @Field(() => [Note], {nullable:true})
    notes?: Array<Note>;

    @Field(() => [Report], {nullable:true})
    reports?: Array<Report>;

    @Field(() => [LessonQuiz], {nullable:true})
    lesson_quizzes?: Array<LessonQuiz>;

    @Field(() => LessonCount, {nullable:false})
    _count?: LessonCount;
}
