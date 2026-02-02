import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemWhereInput } from './cart-item-where.input';
import { Type } from 'class-transformer';
import { CartItemOrderByWithRelationInput } from './cart-item-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CartItemScalarFieldEnum } from './cart-item-scalar-field.enum';

@ArgsType()
export class FindFirstCartItemOrThrowArgs {

    @Field(() => CartItemWhereInput, {nullable:true})
    @Type(() => CartItemWhereInput)
    where?: CartItemWhereInput;

    @Field(() => [CartItemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CartItemOrderByWithRelationInput>;

    @Field(() => CartItemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CartItemScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CartItemScalarFieldEnum>;
}
