import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutAllowed_discount_vouchersInput } from './user-update-without-allowed-discount-vouchers.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutAllowed_discount_vouchersInput } from './user-create-without-allowed-discount-vouchers.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutAllowed_discount_vouchersInput {

    @Field(() => UserUpdateWithoutAllowed_discount_vouchersInput, {nullable:false})
    @Type(() => UserUpdateWithoutAllowed_discount_vouchersInput)
    update!: UserUpdateWithoutAllowed_discount_vouchersInput;

    @Field(() => UserCreateWithoutAllowed_discount_vouchersInput, {nullable:false})
    @Type(() => UserCreateWithoutAllowed_discount_vouchersInput)
    create!: UserCreateWithoutAllowed_discount_vouchersInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
