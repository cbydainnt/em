import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemWhereInput } from './cart-item-where.input';

@InputType()
export class CartItemListRelationFilter {

    @Field(() => CartItemWhereInput, {nullable:true})
    every?: CartItemWhereInput;

    @Field(() => CartItemWhereInput, {nullable:true})
    some?: CartItemWhereInput;

    @Field(() => CartItemWhereInput, {nullable:true})
    none?: CartItemWhereInput;
}
