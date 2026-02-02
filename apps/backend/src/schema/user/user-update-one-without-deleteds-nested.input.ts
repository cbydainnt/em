import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDeletedsInput } from './user-create-without-deleteds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDeletedsInput } from './user-create-or-connect-without-deleteds.input';
import { UserUpsertWithoutDeletedsInput } from './user-upsert-without-deleteds.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutDeletedsInput } from './user-update-to-one-with-where-without-deleteds.input';

@InputType()
export class UserUpdateOneWithoutDeletedsNestedInput {

    @Field(() => UserCreateWithoutDeletedsInput, {nullable:true})
    @Type(() => UserCreateWithoutDeletedsInput)
    create?: UserCreateWithoutDeletedsInput;

    @Field(() => UserCreateOrConnectWithoutDeletedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDeletedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutDeletedsInput;

    @Field(() => UserUpsertWithoutDeletedsInput, {nullable:true})
    @Type(() => UserUpsertWithoutDeletedsInput)
    upsert?: UserUpsertWithoutDeletedsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutDeletedsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutDeletedsInput)
    update?: UserUpdateToOneWithWhereWithoutDeletedsInput;
}
