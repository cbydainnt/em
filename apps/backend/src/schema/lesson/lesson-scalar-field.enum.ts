import { registerEnumType } from '@nestjs/graphql';

export enum LessonScalarFieldEnum {
    lesson_id = "lesson_id",
    lesson_title = "lesson_title",
    lesson_type = "lesson_type",
    lesson_video = "lesson_video",
    lesson_thumbnail = "lesson_thumbnail",
    lesson_order = "lesson_order",
    minutes = "minutes",
    video_duration = "video_duration",
    access_type = "access_type",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    del_flg = "del_flg",
    section_id = "section_id"
}


registerEnumType(LessonScalarFieldEnum, { name: 'LessonScalarFieldEnum', description: undefined })
