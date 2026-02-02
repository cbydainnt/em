import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutDiscount_vouchersInput } from './user-update-without-discount-vouchers.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutDiscount_vouchersInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => UserUpdateWithoutDiscount_vouchersInput)
    data!: UserUpdateWithoutDiscount_vouchersInput;
}
