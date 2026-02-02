import { registerEnumType } from '@nestjs/graphql';

export enum UserNotificationScalarFieldEnum {
    id = "id",
    user_id = "user_id",
    notification_id = "notification_id",
    status = "status",
    read_at = "read_at"
}


registerEnumType(UserNotificationScalarFieldEnum, { name: 'UserNotificationScalarFieldEnum', description: undefined })
