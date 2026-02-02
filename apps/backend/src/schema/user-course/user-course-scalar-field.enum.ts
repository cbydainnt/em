import { registerEnumType } from '@nestjs/graphql';

export enum UserCourseScalarFieldEnum {
    id = "id",
    user_id = "user_id",
    course_id = "course_id",
    enrolled_at = "enrolled_at",
    last_accessed = "last_accessed",
    status = "status",
    expired_date = "expired_date",
    paused_at = "paused_at",
    pause_until = "pause_until",
    total_paused_days = "total_paused_days",
    pause_count = "pause_count",
    created_at = "created_at",
    del_flg = "del_flg"
}


registerEnumType(UserCourseScalarFieldEnum, { name: 'UserCourseScalarFieldEnum', description: undefined })
