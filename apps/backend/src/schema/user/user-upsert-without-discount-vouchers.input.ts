import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutDiscount_vouchersInput } from './user-update-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutDiscount_vouchersInput } from './user-create-without-discount-vouchers.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutDiscount_vouchersInput {

    @Field(() => UserUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => UserUpdateWithoutDiscount_vouchersInput)
    update!: UserUpdateWithoutDiscount_vouchersInput;

    @Field(() => UserCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => UserCreateWithoutDiscount_vouchersInput)
    create!: UserCreateWithoutDiscount_vouchersInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
