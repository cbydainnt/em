import { registerEnumType } from '@nestjs/graphql';

export enum QuizScalarFieldEnum {
    quiz_id = "quiz_id",
    title = "title",
    quiz_type = "quiz_type",
    question_count = "question_count",
    total_questions = "total_questions",
    total_points = "total_points",
    passing_score = "passing_score",
    duration_minutes = "duration_minutes",
    difficulty_level = "difficulty_level",
    version = "version",
    parent_quiz_id = "parent_quiz_id",
    is_latest_version = "is_latest_version",
    version_notes = "version_notes",
    has_audio = "has_audio",
    show_explanation = "show_explanation",
    randomize_questions = "randomize_questions",
    randomize_answers = "randomize_answers",
    allow_review = "allow_review",
    max_attempts = "max_attempts",
    allow_retake = "allow_retake",
    show_results = "show_results",
    status = "status",
    created_at = "created_at",
    updated_at = "updated_at",
    del_flg = "del_flg",
    lesson_id = "lesson_id",
    course_id = "course_id"
}


registerEnumType(QuizScalarFieldEnum, { name: 'QuizScalarFieldEnum', description: undefined })
