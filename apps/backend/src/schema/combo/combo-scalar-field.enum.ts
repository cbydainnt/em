import { registerEnumType } from '@nestjs/graphql';

export enum ComboScalarFieldEnum {
    combo_id = "combo_id",
    combo_name = "combo_name",
    combo_type = "combo_type",
    original_price = "original_price",
    price = "price",
    del_flg = "del_flg",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by"
}


registerEnumType(ComboScalarFieldEnum, { name: 'ComboScalarFieldEnum', description: undefined })
