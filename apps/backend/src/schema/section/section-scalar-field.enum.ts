import { registerEnumType } from '@nestjs/graphql';

export enum SectionScalarFieldEnum {
    section_id = "section_id",
    section_title = "section_title",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    del_flg = "del_flg",
    course_id = "course_id"
}


registerEnumType(SectionScalarFieldEnum, { name: 'SectionScalarFieldEnum', description: undefined })
