import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCreatedsInput } from './user-create-without-createds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCreatedsInput } from './user-create-or-connect-without-createds.input';
import { UserUpsertWithoutCreatedsInput } from './user-upsert-without-createds.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCreatedsInput } from './user-update-to-one-with-where-without-createds.input';

@InputType()
export class UserUpdateOneWithoutCreatedsNestedInput {

    @Field(() => UserCreateWithoutCreatedsInput, {nullable:true})
    @Type(() => UserCreateWithoutCreatedsInput)
    create?: UserCreateWithoutCreatedsInput;

    @Field(() => UserCreateOrConnectWithoutCreatedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCreatedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCreatedsInput;

    @Field(() => UserUpsertWithoutCreatedsInput, {nullable:true})
    @Type(() => UserUpsertWithoutCreatedsInput)
    upsert?: UserUpsertWithoutCreatedsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCreatedsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCreatedsInput)
    update?: UserUpdateToOneWithWhereWithoutCreatedsInput;
}
