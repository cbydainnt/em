import { registerEnumType } from '@nestjs/graphql';

export enum CategoryScalarFieldEnum {
    category_id = "category_id",
    title = "title",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    del_flg = "del_flg",
    sort_order = "sort_order"
}


registerEnumType(CategoryScalarFieldEnum, { name: 'CategoryScalarFieldEnum', description: undefined })
