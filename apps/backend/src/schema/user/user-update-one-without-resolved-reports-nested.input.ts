import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutResolved_reportsInput } from './user-create-without-resolved-reports.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutResolved_reportsInput } from './user-create-or-connect-without-resolved-reports.input';
import { UserUpsertWithoutResolved_reportsInput } from './user-upsert-without-resolved-reports.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutResolved_reportsInput } from './user-update-to-one-with-where-without-resolved-reports.input';

@InputType()
export class UserUpdateOneWithoutResolved_reportsNestedInput {

    @Field(() => UserCreateWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserCreateWithoutResolved_reportsInput)
    create?: UserCreateWithoutResolved_reportsInput;

    @Field(() => UserCreateOrConnectWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutResolved_reportsInput)
    connectOrCreate?: UserCreateOrConnectWithoutResolved_reportsInput;

    @Field(() => UserUpsertWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserUpsertWithoutResolved_reportsInput)
    upsert?: UserUpsertWithoutResolved_reportsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    delete?: UserWhereInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutResolved_reportsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutResolved_reportsInput)
    update?: UserUpdateToOneWithWhereWithoutResolved_reportsInput;
}
