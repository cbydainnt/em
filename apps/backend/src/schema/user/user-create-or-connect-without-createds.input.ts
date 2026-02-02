import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCreatedsInput } from './user-create-without-createds.input';

@InputType()
export class UserCreateOrConnectWithoutCreatedsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutCreatedsInput, {nullable:false})
    @Type(() => UserCreateWithoutCreatedsInput)
    create!: UserCreateWithoutCreatedsInput;
}
