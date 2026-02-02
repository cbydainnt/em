import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemCreateInput } from './cart-item-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCartItemArgs {

    @Field(() => CartItemCreateInput, {nullable:false})
    @Type(() => CartItemCreateInput)
    data!: CartItemCreateInput;
}
