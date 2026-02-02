import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutDiscount_vouchersInput } from './user-create-without-discount-vouchers.input';

@InputType()
export class UserCreateOrConnectWithoutDiscount_vouchersInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => UserCreateWithoutDiscount_vouchersInput)
    create!: UserCreateWithoutDiscount_vouchersInput;
}
