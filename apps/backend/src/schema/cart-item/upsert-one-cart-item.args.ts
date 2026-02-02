import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';
import { CartItemCreateInput } from './cart-item-create.input';
import { CartItemUpdateInput } from './cart-item-update.input';

@ArgsType()
export class UpsertOneCartItemArgs {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;

    @Field(() => CartItemCreateInput, {nullable:false})
    @Type(() => CartItemCreateInput)
    create!: CartItemCreateInput;

    @Field(() => CartItemUpdateInput, {nullable:false})
    @Type(() => CartItemUpdateInput)
    update!: CartItemUpdateInput;
}
