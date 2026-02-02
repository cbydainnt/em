import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutDeletedsInput } from './user-create-without-deleteds.input';

@InputType()
export class UserCreateOrConnectWithoutDeletedsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutDeletedsInput, {nullable:false})
    @Type(() => UserCreateWithoutDeletedsInput)
    create!: UserCreateWithoutDeletedsInput;
}
