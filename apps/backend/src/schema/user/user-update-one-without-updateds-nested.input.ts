import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUpdatedsInput } from './user-create-without-updateds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUpdatedsInput } from './user-create-or-connect-without-updateds.input';
import { UserUpsertWithoutUpdatedsInput } from './user-upsert-without-updateds.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutUpdatedsInput } from './user-update-to-one-with-where-without-updateds.input';

@InputType()
export class UserUpdateOneWithoutUpdatedsNestedInput {

    @Field(() => UserCreateWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserCreateWithoutUpdatedsInput)
    create?: UserCreateWithoutUpdatedsInput;

    @Field(() => UserCreateOrConnectWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUpdatedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedsInput;

    @Field(() => UserUpsertWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserUpsertWithoutUpdatedsInput)
    upsert?: UserUpsertWithoutUpdatedsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutUpdatedsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUpdatedsInput)
    update?: UserUpdateToOneWithWhereWithoutUpdatedsInput;
}
