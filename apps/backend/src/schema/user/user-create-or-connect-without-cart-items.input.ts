import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCartItemsInput } from './user-create-without-cart-items.input';

@InputType()
export class UserCreateOrConnectWithoutCartItemsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutCartItemsInput, {nullable:false})
    @Type(() => UserCreateWithoutCartItemsInput)
    create!: UserCreateWithoutCartItemsInput;
}
