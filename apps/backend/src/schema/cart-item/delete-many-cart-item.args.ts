import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemWhereInput } from './cart-item-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCartItemArgs {

    @Field(() => CartItemWhereInput, {nullable:true})
    @Type(() => CartItemWhereInput)
    where?: CartItemWhereInput;
}
