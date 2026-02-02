import { registerEnumType } from '@nestjs/graphql';

export enum CourseScalarFieldEnum {
    course_id = "course_id",
    course_name = "course_name",
    course_description = "course_description",
    course_price = "course_price",
    course_original_price = "course_original_price",
    state = "state",
    target = "target",
    thumbnail = "thumbnail",
    access_duration_months = "access_duration_months",
    access_type = "access_type",
    access_expire_at = "access_expire_at",
    view_count = "view_count",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    del_flg = "del_flg"
}


registerEnumType(CourseScalarFieldEnum, { name: 'CourseScalarFieldEnum', description: undefined })
