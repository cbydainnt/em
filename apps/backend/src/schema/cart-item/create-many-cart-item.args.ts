import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemCreateManyInput } from './cart-item-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCartItemArgs {

    @Field(() => [CartItemCreateManyInput], {nullable:false})
    @Type(() => CartItemCreateManyInput)
    data!: Array<CartItemCreateManyInput>;
}
