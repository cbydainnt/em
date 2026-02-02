import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUpdatedsInput } from './user-create-without-updateds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUpdatedsInput } from './user-create-or-connect-without-updateds.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUpdatedsInput {

    @Field(() => UserCreateWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserCreateWithoutUpdatedsInput)
    create?: UserCreateWithoutUpdatedsInput;

    @Field(() => UserCreateOrConnectWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUpdatedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
