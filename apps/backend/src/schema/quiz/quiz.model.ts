import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Course } from '../course/course.model';
import { Question } from '../question/question.model';
import { QuizAudio } from '../quiz-audio/quiz-audio.model';
import { UserQuizProgress } from '../user-quiz-progress/user-quiz-progress.model';
import { LessonQuiz } from '../lesson-quiz/lesson-quiz.model';
import { QuizCount } from './quiz-count.output';

@ObjectType()
export class Quiz {

    @Field(() => ID, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    quiz_type!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    question_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_questions!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_points!: number;

    @Field(() => Int, {nullable:false,defaultValue:70})
    passing_score!: number;

    @Field(() => Int, {nullable:true})
    duration_minutes!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    difficulty_level!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    version!: number;

    @Field(() => String, {nullable:true})
    parent_quiz_id!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    is_latest_version!: boolean;

    @Field(() => String, {nullable:true})
    version_notes!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    has_audio!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    show_explanation!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    randomize_questions!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    randomize_answers!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    allow_review!: boolean;

    @Field(() => Int, {nullable:true})
    max_attempts!: number | null;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    allow_retake!: boolean;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    show_results!: boolean;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => String, {nullable:true})
    lesson_id!: string | null;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => [Question], {nullable:true})
    questions?: Array<Question>;

    @Field(() => [QuizAudio], {nullable:true})
    audios?: Array<QuizAudio>;

    @Field(() => [UserQuizProgress], {nullable:true})
    user_progress?: Array<UserQuizProgress>;

    @Field(() => Quiz, {nullable:true})
    parent_quiz?: Quiz | null;

    @Field(() => [Quiz], {nullable:true})
    quiz_versions?: Array<Quiz>;

    @Field(() => [LessonQuiz], {nullable:true})
    quiz_lessons?: Array<LessonQuiz>;

    @Field(() => QuizCount, {nullable:false})
    _count?: QuizCount;
}
