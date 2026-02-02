import { registerEnumType } from '@nestjs/graphql';

export enum UserLessonProgressScalarFieldEnum {
    id = "id",
    user_id = "user_id",
    course_id = "course_id",
    lesson_id = "lesson_id",
    watched_seconds = "watched_seconds",
    completed = "completed",
    last_accessed = "last_accessed",
    segments = "segments",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(UserLessonProgressScalarFieldEnum, { name: 'UserLessonProgressScalarFieldEnum', description: undefined })
