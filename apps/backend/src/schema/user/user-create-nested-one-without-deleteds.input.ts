import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDeletedsInput } from './user-create-without-deleteds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDeletedsInput } from './user-create-or-connect-without-deleteds.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutDeletedsInput {

    @Field(() => UserCreateWithoutDeletedsInput, {nullable:true})
    @Type(() => UserCreateWithoutDeletedsInput)
    create?: UserCreateWithoutDeletedsInput;

    @Field(() => UserCreateOrConnectWithoutDeletedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDeletedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutDeletedsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
