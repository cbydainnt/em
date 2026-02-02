import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutDeleted_byInput } from './user-create-without-deleted-by.input';

@InputType()
export class UserCreateOrConnectWithoutDeleted_byInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutDeleted_byInput, {nullable:false})
    @Type(() => UserCreateWithoutDeleted_byInput)
    create!: UserCreateWithoutDeleted_byInput;
}
