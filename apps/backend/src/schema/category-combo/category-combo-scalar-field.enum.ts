import { registerEnumType } from '@nestjs/graphql';

export enum CategoryComboScalarFieldEnum {
    id = "id",
    category_id = "category_id",
    combo_id = "combo_id"
}


registerEnumType(CategoryComboScalarFieldEnum, { name: 'CategoryComboScalarFieldEnum', description: undefined })
