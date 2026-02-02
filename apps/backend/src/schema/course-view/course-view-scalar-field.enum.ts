import { registerEnumType } from '@nestjs/graphql';

export enum CourseViewScalarFieldEnum {
    id = "id",
    course_id = "course_id",
    user_id = "user_id",
    ip_address = "ip_address",
    user_agent = "user_agent",
    created_at = "created_at"
}


registerEnumType(CourseViewScalarFieldEnum, { name: 'CourseViewScalarFieldEnum', description: undefined })
