import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateManyUserInput } from './cart-item-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class CartItemCreateManyUserInputEnvelope {

    @Field(() => [CartItemCreateManyUserInput], {nullable:false})
    @Type(() => CartItemCreateManyUserInput)
    data!: Array<CartItemCreateManyUserInput>;
}
