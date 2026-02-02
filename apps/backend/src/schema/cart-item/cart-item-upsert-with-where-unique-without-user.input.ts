import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';
import { CartItemUpdateWithoutUserInput } from './cart-item-update-without-user.input';
import { CartItemCreateWithoutUserInput } from './cart-item-create-without-user.input';

@InputType()
export class CartItemUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;

    @Field(() => CartItemUpdateWithoutUserInput, {nullable:false})
    @Type(() => CartItemUpdateWithoutUserInput)
    update!: CartItemUpdateWithoutUserInput;

    @Field(() => CartItemCreateWithoutUserInput, {nullable:false})
    @Type(() => CartItemCreateWithoutUserInput)
    create!: CartItemCreateWithoutUserInput;
}
