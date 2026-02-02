import { registerEnumType } from '@nestjs/graphql';

export enum QuestionScalarFieldEnum {
    question_id = "question_id",
    quiz_id = "quiz_id",
    question_text = "question_text",
    question_image = "question_image",
    question_type = "question_type",
    order = "order",
    points = "points",
    difficulty = "difficulty",
    explanation = "explanation",
    audio_id = "audio_id",
    audio_order = "audio_order",
    reading_passage_id = "reading_passage_id",
    del_flg = "del_flg",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(QuestionScalarFieldEnum, { name: 'QuestionScalarFieldEnum', description: undefined })
