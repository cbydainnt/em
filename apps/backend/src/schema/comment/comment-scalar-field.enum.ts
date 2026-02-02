import { registerEnumType } from '@nestjs/graphql';

export enum CommentScalarFieldEnum {
    comment_id = "comment_id",
    parent_id = "parent_id",
    content = "content",
    image_url = "image_url",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    del_flg = "del_flg",
    is_hidden = "is_hidden",
    seed_tag = "seed_tag",
    course_id = "course_id",
    lesson_id = "lesson_id",
    user_id = "user_id"
}


registerEnumType(CommentScalarFieldEnum, { name: 'CommentScalarFieldEnum', description: undefined })
