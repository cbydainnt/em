import { registerEnumType } from '@nestjs/graphql';

export enum CartItemScalarFieldEnum {
    cart_item_id = "cart_item_id",
    user_id = "user_id",
    course_id = "course_id",
    added_at = "added_at",
    selected = "selected"
}


registerEnumType(CartItemScalarFieldEnum, { name: 'CartItemScalarFieldEnum', description: undefined })
