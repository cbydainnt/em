import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateWithoutUserInput } from './cart-item-create-without-user.input';
import { Type } from 'class-transformer';
import { CartItemCreateOrConnectWithoutUserInput } from './cart-item-create-or-connect-without-user.input';
import { CartItemCreateManyUserInputEnvelope } from './cart-item-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';

@InputType()
export class CartItemUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [CartItemCreateWithoutUserInput], {nullable:true})
    @Type(() => CartItemCreateWithoutUserInput)
    create?: Array<CartItemCreateWithoutUserInput>;

    @Field(() => [CartItemCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CartItemCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CartItemCreateOrConnectWithoutUserInput>;

    @Field(() => CartItemCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CartItemCreateManyUserInputEnvelope)
    createMany?: CartItemCreateManyUserInputEnvelope;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;
}
