import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCartItemsInput } from './user-update-without-cart-items.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCartItemsInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCartItemsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCartItemsInput)
    data!: UserUpdateWithoutCartItemsInput;
}
