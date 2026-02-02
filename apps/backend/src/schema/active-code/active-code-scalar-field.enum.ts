import { registerEnumType } from '@nestjs/graphql';

export enum ActiveCodeScalarFieldEnum {
    active_code_id = "active_code_id",
    order_item_id = "order_item_id",
    course_id = "course_id",
    customer_id = "customer_id",
    combo_id = "combo_id",
    item_type = "item_type",
    code = "code",
    status = "status",
    created_at = "created_at",
    used_at = "used_at",
    expires_at = "expires_at"
}


registerEnumType(ActiveCodeScalarFieldEnum, { name: 'ActiveCodeScalarFieldEnum', description: undefined })
