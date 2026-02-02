import { registerEnumType } from '@nestjs/graphql';

export enum NoteScalarFieldEnum {
    note_id = "note_id",
    content = "content",
    timestamp = "timestamp",
    created_at = "created_at",
    updated_at = "updated_at",
    user_id = "user_id",
    lesson_id = "lesson_id",
    del_flg = "del_flg",
    background_color = "background_color"
}


registerEnumType(NoteScalarFieldEnum, { name: 'NoteScalarFieldEnum', description: undefined })
