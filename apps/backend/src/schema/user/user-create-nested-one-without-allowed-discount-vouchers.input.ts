import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutAllowed_discount_vouchersInput } from './user-create-without-allowed-discount-vouchers.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutAllowed_discount_vouchersInput } from './user-create-or-connect-without-allowed-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutAllowed_discount_vouchersInput {

    @Field(() => UserCreateWithoutAllowed_discount_vouchersInput, {nullable:true})
    @Type(() => UserCreateWithoutAllowed_discount_vouchersInput)
    create?: UserCreateWithoutAllowed_discount_vouchersInput;

    @Field(() => UserCreateOrConnectWithoutAllowed_discount_vouchersInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutAllowed_discount_vouchersInput)
    connectOrCreate?: UserCreateOrConnectWithoutAllowed_discount_vouchersInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
