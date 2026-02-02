import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutAllowed_discount_vouchersInput } from './user-update-without-allowed-discount-vouchers.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutAllowed_discount_vouchersInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutAllowed_discount_vouchersInput, {nullable:false})
    @Type(() => UserUpdateWithoutAllowed_discount_vouchersInput)
    data!: UserUpdateWithoutAllowed_discount_vouchersInput;
}
