import { registerEnumType } from '@nestjs/graphql';

export enum NotificationScalarFieldEnum {
    notification_id = "notification_id",
    user_id = "user_id",
    user_type = "user_type",
    title = "title",
    message = "message",
    type = "type",
    context = "context",
    action_url = "action_url",
    status = "status",
    course_id = "course_id",
    lesson_id = "lesson_id",
    created_at = "created_at",
    updated_at = "updated_at",
    del_flg = "del_flg"
}


registerEnumType(NotificationScalarFieldEnum, { name: 'NotificationScalarFieldEnum', description: undefined })
