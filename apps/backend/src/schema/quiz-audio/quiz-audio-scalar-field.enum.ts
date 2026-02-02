import { registerEnumType } from '@nestjs/graphql';

export enum QuizAudioScalarFieldEnum {
    audio_id = "audio_id",
    quiz_id = "quiz_id",
    title = "title",
    audio_url = "audio_url",
    file_name = "file_name",
    duration_seconds = "duration_seconds",
    transcript = "transcript",
    total_questions = "total_questions",
    created_at = "created_at",
    question_ordering = "question_ordering"
}


registerEnumType(QuizAudioScalarFieldEnum, { name: 'QuizAudioScalarFieldEnum', description: undefined })
