import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCreatedsInput } from './user-create-without-createds.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCreatedsInput } from './user-create-or-connect-without-createds.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCreatedsInput {

    @Field(() => UserCreateWithoutCreatedsInput, {nullable:true})
    @Type(() => UserCreateWithoutCreatedsInput)
    create?: UserCreateWithoutCreatedsInput;

    @Field(() => UserCreateOrConnectWithoutCreatedsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCreatedsInput)
    connectOrCreate?: UserCreateOrConnectWithoutCreatedsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
