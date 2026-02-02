import { registerEnumType } from '@nestjs/graphql';

export enum LessonQuizScalarFieldEnum {
    id = "id",
    lesson_id = "lesson_id",
    quiz_id = "quiz_id",
    order = "order",
    created_at = "created_at"
}


registerEnumType(LessonQuizScalarFieldEnum, { name: 'LessonQuizScalarFieldEnum', description: undefined })
