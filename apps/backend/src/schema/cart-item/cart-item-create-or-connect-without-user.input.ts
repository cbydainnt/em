import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';
import { CartItemCreateWithoutUserInput } from './cart-item-create-without-user.input';

@InputType()
export class CartItemCreateOrConnectWithoutUserInput {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;

    @Field(() => CartItemCreateWithoutUserInput, {nullable:false})
    @Type(() => CartItemCreateWithoutUserInput)
    create!: CartItemCreateWithoutUserInput;
}
