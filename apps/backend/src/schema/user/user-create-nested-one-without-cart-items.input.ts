import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCartItemsInput } from './user-create-without-cart-items.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCartItemsInput } from './user-create-or-connect-without-cart-items.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCartItemsInput {

    @Field(() => UserCreateWithoutCartItemsInput, {nullable:true})
    @Type(() => UserCreateWithoutCartItemsInput)
    create?: UserCreateWithoutCartItemsInput;

    @Field(() => UserCreateOrConnectWithoutCartItemsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCartItemsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCartItemsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
