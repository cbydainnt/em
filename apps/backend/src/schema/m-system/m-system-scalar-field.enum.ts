import { registerEnumType } from '@nestjs/graphql';

export enum MSystemScalarFieldEnum {
    id = "id",
    param_key = "param_key",
    param_no = "param_no",
    param_name = "param_name",
    param_value = "param_value",
    sort = "sort",
    category = "category",
    created_by = "created_by",
    updated_by = "updated_by",
    create_at = "create_at",
    updated_at = "updated_at",
    del_flg = "del_flg"
}


registerEnumType(MSystemScalarFieldEnum, { name: 'MSystemScalarFieldEnum', description: undefined })
