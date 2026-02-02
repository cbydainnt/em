import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { CourseNullableRelationFilter } from '../course/course-nullable-relation-filter.input';
import { QuestionListRelationFilter } from '../question/question-list-relation-filter.input';
import { QuizAudioListRelationFilter } from '../quiz-audio/quiz-audio-list-relation-filter.input';
import { UserQuizProgressListRelationFilter } from '../user-quiz-progress/user-quiz-progress-list-relation-filter.input';
import { QuizNullableRelationFilter } from './quiz-nullable-relation-filter.input';
import { QuizListRelationFilter } from './quiz-list-relation-filter.input';
import { LessonQuizListRelationFilter } from '../lesson-quiz/lesson-quiz-list-relation-filter.input';

@InputType()
export class QuizWhereInput {

    @Field(() => [QuizWhereInput], {nullable:true})
    AND?: Array<QuizWhereInput>;

    @Field(() => [QuizWhereInput], {nullable:true})
    OR?: Array<QuizWhereInput>;

    @Field(() => [QuizWhereInput], {nullable:true})
    NOT?: Array<QuizWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    quiz_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    quiz_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    question_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    total_questions?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    total_points?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    passing_score?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    duration_minutes?: IntNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    difficulty_level?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    version?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    parent_quiz_id?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    is_latest_version?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    version_notes?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    has_audio?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    show_explanation?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    randomize_questions?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    randomize_answers?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    allow_review?: BoolFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    max_attempts?: IntNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    allow_retake?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    show_results?: BoolFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lesson_id?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    course_id?: StringNullableFilter;

    @Field(() => CourseNullableRelationFilter, {nullable:true})
    course?: CourseNullableRelationFilter;

    @Field(() => QuestionListRelationFilter, {nullable:true})
    questions?: QuestionListRelationFilter;

    @Field(() => QuizAudioListRelationFilter, {nullable:true})
    audios?: QuizAudioListRelationFilter;

    @Field(() => UserQuizProgressListRelationFilter, {nullable:true})
    user_progress?: UserQuizProgressListRelationFilter;

    @Field(() => QuizNullableRelationFilter, {nullable:true})
    parent_quiz?: QuizNullableRelationFilter;

    @Field(() => QuizListRelationFilter, {nullable:true})
    quiz_versions?: QuizListRelationFilter;

    @Field(() => LessonQuizListRelationFilter, {nullable:true})
    quiz_lessons?: LessonQuizListRelationFilter;
}
