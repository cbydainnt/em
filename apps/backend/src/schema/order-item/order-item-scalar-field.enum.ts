import { registerEnumType } from '@nestjs/graphql';

export enum OrderItemScalarFieldEnum {
    order_item_id = "order_item_id",
    order_id = "order_id",
    item_type = "item_type",
    combo_id = "combo_id",
    course_id = "course_id",
    final_price = "final_price",
    created_at = "created_at",
    updated_at = "updated_at",
    del_flg = "del_flg"
}


registerEnumType(OrderItemScalarFieldEnum, { name: 'OrderItemScalarFieldEnum', description: undefined })
