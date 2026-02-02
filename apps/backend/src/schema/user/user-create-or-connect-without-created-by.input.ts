import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCreated_byInput } from './user-create-without-created-by.input';

@InputType()
export class UserCreateOrConnectWithoutCreated_byInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutCreated_byInput, {nullable:false})
    @Type(() => UserCreateWithoutCreated_byInput)
    create!: UserCreateWithoutCreated_byInput;
}
