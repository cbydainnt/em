import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutReportsInput } from './user-create-without-reports.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutReportsInput } from './user-create-or-connect-without-reports.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutReportsInput {

    @Field(() => UserCreateWithoutReportsInput, {nullable:true})
    @Type(() => UserCreateWithoutReportsInput)
    create?: UserCreateWithoutReportsInput;

    @Field(() => UserCreateOrConnectWithoutReportsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutReportsInput)
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
