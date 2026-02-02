import { registerEnumType } from '@nestjs/graphql';

export enum UserQuizAnswerScalarFieldEnum {
    id = "id",
    progress_id = "progress_id",
    question_id = "question_id",
    selected_answer_ids = "selected_answer_ids",
    answer_text = "answer_text",
    is_correct = "is_correct",
    points_earned = "points_earned",
    time_spent = "time_spent",
    created_at = "created_at"
}


registerEnumType(UserQuizAnswerScalarFieldEnum, { name: 'UserQuizAnswerScalarFieldEnum', description: undefined })
