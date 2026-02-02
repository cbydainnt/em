import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutQuizzesInput } from '../course/course-create-nested-one-without-quizzes.input';
import { QuizAudioCreateNestedManyWithoutQuizInput } from '../quiz-audio/quiz-audio-create-nested-many-without-quiz.input';
import { UserQuizProgressCreateNestedManyWithoutQuizInput } from '../user-quiz-progress/user-quiz-progress-create-nested-many-without-quiz.input';
import { QuizCreateNestedOneWithoutQuiz_versionsInput } from './quiz-create-nested-one-without-quiz-versions.input';
import { QuizCreateNestedManyWithoutParent_quizInput } from './quiz-create-nested-many-without-parent-quiz.input';
import { LessonQuizCreateNestedManyWithoutQuizInput } from '../lesson-quiz/lesson-quiz-create-nested-many-without-quiz.input';

@InputType()
export class QuizCreateWithoutQuestionsInput {

    @Field(() => String, {nullable:true})
    quiz_id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Int, {nullable:true})
    quiz_type?: number;

    @Field(() => Int, {nullable:true})
    question_count?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Int, {nullable:true})
    total_points?: number;

    @Field(() => Int, {nullable:true})
    passing_score?: number;

    @Field(() => Int, {nullable:true})
    duration_minutes?: number;

    @Field(() => Int, {nullable:true})
    difficulty_level?: number;

    @Field(() => Int, {nullable:true})
    version?: number;

    @Field(() => Boolean, {nullable:true})
    is_latest_version?: boolean;

    @Field(() => String, {nullable:true})
    version_notes?: string;

    @Field(() => Boolean, {nullable:true})
    has_audio?: boolean;

    @Field(() => Boolean, {nullable:true})
    show_explanation?: boolean;

    @Field(() => Boolean, {nullable:true})
    randomize_questions?: boolean;

    @Field(() => Boolean, {nullable:true})
    randomize_answers?: boolean;

    @Field(() => Boolean, {nullable:true})
    allow_review?: boolean;

    @Field(() => Int, {nullable:true})
    max_attempts?: number;

    @Field(() => Boolean, {nullable:true})
    allow_retake?: boolean;

    @Field(() => Boolean, {nullable:true})
    show_results?: boolean;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => String, {nullable:true})
    lesson_id?: string;

    @Field(() => CourseCreateNestedOneWithoutQuizzesInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutQuizzesInput;

    @Field(() => QuizAudioCreateNestedManyWithoutQuizInput, {nullable:true})
    audios?: QuizAudioCreateNestedManyWithoutQuizInput;

    @Field(() => UserQuizProgressCreateNestedManyWithoutQuizInput, {nullable:true})
    user_progress?: UserQuizProgressCreateNestedManyWithoutQuizInput;

    @Field(() => QuizCreateNestedOneWithoutQuiz_versionsInput, {nullable:true})
    parent_quiz?: QuizCreateNestedOneWithoutQuiz_versionsInput;

    @Field(() => QuizCreateNestedManyWithoutParent_quizInput, {nullable:true})
    quiz_versions?: QuizCreateNestedManyWithoutParent_quizInput;

    @Field(() => LessonQuizCreateNestedManyWithoutQuizInput, {nullable:true})
    quiz_lessons?: LessonQuizCreateNestedManyWithoutQuizInput;
}
