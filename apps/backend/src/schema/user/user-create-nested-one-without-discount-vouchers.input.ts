import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDiscount_vouchersInput } from './user-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDiscount_vouchersInput } from './user-create-or-connect-without-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutDiscount_vouchersInput {

    @Field(() => UserCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserCreateWithoutDiscount_vouchersInput)
    create?: UserCreateWithoutDiscount_vouchersInput;

    @Field(() => UserCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: UserCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;
}
