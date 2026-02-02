import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemScalarWhereInput } from './cart-item-scalar-where.input';
import { Type } from 'class-transformer';
import { CartItemUpdateManyMutationInput } from './cart-item-update-many-mutation.input';

@InputType()
export class CartItemUpdateManyWithWhereWithoutCourseInput {

    @Field(() => CartItemScalarWhereInput, {nullable:false})
    @Type(() => CartItemScalarWhereInput)
    where!: CartItemScalarWhereInput;

    @Field(() => CartItemUpdateManyMutationInput, {nullable:false})
    @Type(() => CartItemUpdateManyMutationInput)
    data!: CartItemUpdateManyMutationInput;
}
