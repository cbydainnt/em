import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutResolved_reportsInput } from './user-create-without-resolved-reports.input';

@InputType()
export class UserCreateOrConnectWithoutResolved_reportsInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutResolved_reportsInput, {nullable:false})
    @Type(() => UserCreateWithoutResolved_reportsInput)
    create!: UserCreateWithoutResolved_reportsInput;
}
