import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemUpdateInput } from './cart-item-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';

@ArgsType()
export class UpdateOneCartItemArgs {

    @Field(() => CartItemUpdateInput, {nullable:false})
    @Type(() => CartItemUpdateInput)
    data!: CartItemUpdateInput;

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;
}
