import { registerEnumType } from '@nestjs/graphql';

export enum ReportScalarFieldEnum {
    report_id = "report_id",
    user_id = "user_id",
    course_id = "course_id",
    lesson_id = "lesson_id",
    report_type = "report_type",
    category = "category",
    title = "title",
    description = "description",
    screenshot_urls = "screenshot_urls",
    status = "status",
    priority = "priority",
    created_at = "created_at",
    updated_at = "updated_at",
    resolved_at = "resolved_at",
    resolved_by = "resolved_by",
    resolution_notes = "resolution_notes",
    is_anonymous = "is_anonymous",
    allow_contact = "allow_contact",
    del_flg = "del_flg"
}


registerEnumType(ReportScalarFieldEnum, { name: 'ReportScalarFieldEnum', description: undefined })
