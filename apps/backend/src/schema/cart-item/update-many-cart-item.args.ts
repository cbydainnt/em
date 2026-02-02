import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemUpdateManyMutationInput } from './cart-item-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CartItemWhereInput } from './cart-item-where.input';

@ArgsType()
export class UpdateManyCartItemArgs {

    @Field(() => CartItemUpdateManyMutationInput, {nullable:false})
    @Type(() => CartItemUpdateManyMutationInput)
    data!: CartItemUpdateManyMutationInput;

    @Field(() => CartItemWhereInput, {nullable:true})
    @Type(() => CartItemWhereInput)
    where?: CartItemWhereInput;
}
