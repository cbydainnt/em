import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutResolved_reportsInput } from './user-create-without-resolved-reports.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutResolved_reportsInput } from './user-create-or-connect-without-resolved-reports.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutResolved_reportsInput {

    @Field(() => UserCreateWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserCreateWithoutResolved_reportsInput)
    create?: UserCreateWithoutResolved_reportsInput;

    @Field(() => UserCreateOrConnectWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutResolved_reportsInput)
    connectOrCreate?: UserCreateOrConnectWithoutResolved_reportsInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
