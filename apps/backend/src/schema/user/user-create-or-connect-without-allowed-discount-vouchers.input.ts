import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutAllowed_discount_vouchersInput } from './user-create-without-allowed-discount-vouchers.input';

@InputType()
export class UserCreateOrConnectWithoutAllowed_discount_vouchersInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserCreateWithoutAllowed_discount_vouchersInput, {nullable:false})
    @Type(() => UserCreateWithoutAllowed_discount_vouchersInput)
    create!: UserCreateWithoutAllowed_discount_vouchersInput;
}
