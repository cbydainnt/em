import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutDiscount_vouchersInput } from './user-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutDiscount_vouchersInput } from './user-create-or-connect-without-discount-vouchers.input';
import { UserUpsertWithoutDiscount_vouchersInput } from './user-upsert-without-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutDiscount_vouchersInput } from './user-update-to-one-with-where-without-discount-vouchers.input';

@InputType()
export class UserUpdateOneRequiredWithoutDiscount_vouchersNestedInput {

    @Field(() => UserCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserCreateWithoutDiscount_vouchersInput)
    create?: UserCreateWithoutDiscount_vouchersInput;

    @Field(() => UserCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: UserCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => UserUpsertWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserUpsertWithoutDiscount_vouchersInput)
    upsert?: UserUpsertWithoutDiscount_vouchersInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'googleId'>;

    @Field(() => UserUpdateToOneWithWhereWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutDiscount_vouchersInput)
    update?: UserUpdateToOneWithWhereWithoutDiscount_vouchersInput;
}
