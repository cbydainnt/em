import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneCartItemArgs {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;
}
