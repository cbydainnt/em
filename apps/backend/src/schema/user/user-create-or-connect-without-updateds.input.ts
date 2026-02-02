import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUpdatedsInput } from './user-create-without-updateds.input';

@InputType()
export class UserCreateOrConnectWithoutUpdatedsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutUpdatedsInput, {nullable:false})
    @Type(() => UserCreateWithoutUpdatedsInput)
    create!: UserCreateWithoutUpdatedsInput;
}
