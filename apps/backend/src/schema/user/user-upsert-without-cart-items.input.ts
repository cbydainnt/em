import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCartItemsInput } from './user-update-without-cart-items.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCartItemsInput } from './user-create-without-cart-items.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCartItemsInput {

    @Field(() => UserUpdateWithoutCartItemsInput, {nullable:false})
    @Type(() => UserUpdateWithoutCartItemsInput)
    update!: UserUpdateWithoutCartItemsInput;

    @Field(() => UserCreateWithoutCartItemsInput, {nullable:false})
    @Type(() => UserCreateWithoutCartItemsInput)
    create!: UserCreateWithoutCartItemsInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
