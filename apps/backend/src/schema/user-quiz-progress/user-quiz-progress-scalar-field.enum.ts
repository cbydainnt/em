import { registerEnumType } from '@nestjs/graphql';

export enum UserQuizProgressScalarFieldEnum {
    progress_id = "progress_id",
    user_id = "user_id",
    quiz_id = "quiz_id",
    lesson_id = "lesson_id",
    course_id = "course_id",
    score = "score",
    percentage = "percentage",
    total_questions = "total_questions",
    correct_answers = "correct_answers",
    status = "status",
    passed = "passed",
    time_spent = "time_spent",
    started_at = "started_at",
    completed_at = "completed_at",
    attempts = "attempts",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(UserQuizProgressScalarFieldEnum, { name: 'UserQuizProgressScalarFieldEnum', description: undefined })
