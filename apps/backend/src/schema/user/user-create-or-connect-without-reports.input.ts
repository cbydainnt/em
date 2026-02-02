import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutReportsInput } from './user-create-without-reports.input';

@InputType()
export class UserCreateOrConnectWithoutReportsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutReportsInput, {nullable:false})
    @Type(() => UserCreateWithoutReportsInput)
    create!: UserCreateWithoutReportsInput;
}
