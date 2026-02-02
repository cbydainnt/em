import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateWithoutUserInput } from './cart-item-create-without-user.input';
import { Type } from 'class-transformer';
import { CartItemCreateOrConnectWithoutUserInput } from './cart-item-create-or-connect-without-user.input';
import { CartItemUpsertWithWhereUniqueWithoutUserInput } from './cart-item-upsert-with-where-unique-without-user.input';
import { CartItemCreateManyUserInputEnvelope } from './cart-item-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { CartItemUpdateWithWhereUniqueWithoutUserInput } from './cart-item-update-with-where-unique-without-user.input';
import { CartItemUpdateManyWithWhereWithoutUserInput } from './cart-item-update-many-with-where-without-user.input';
import { CartItemScalarWhereInput } from './cart-item-scalar-where.input';

@InputType()
export class CartItemUpdateManyWithoutUserNestedInput {

    @Field(() => [CartItemCreateWithoutUserInput], {nullable:true})
    @Type(() => CartItemCreateWithoutUserInput)
    create?: Array<CartItemCreateWithoutUserInput>;

    @Field(() => [CartItemCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CartItemCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CartItemCreateOrConnectWithoutUserInput>;

    @Field(() => [CartItemUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CartItemUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<CartItemUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CartItemCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CartItemCreateManyUserInputEnvelope)
    createMany?: CartItemCreateManyUserInputEnvelope;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CartItemUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<CartItemUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CartItemUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => CartItemUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<CartItemUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CartItemScalarWhereInput], {nullable:true})
    @Type(() => CartItemScalarWhereInput)
    deleteMany?: Array<CartItemScalarWhereInput>;
}
