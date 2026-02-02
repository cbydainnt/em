import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUpdateWithoutApplicable_usersInput } from './discount-voucher-update-without-applicable-users.input';

@InputType()
export class DiscountVoucherUpdateToOneWithWhereWithoutApplicable_usersInput {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => DiscountVoucherUpdateWithoutApplicable_usersInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutApplicable_usersInput)
    data!: DiscountVoucherUpdateWithoutApplicable_usersInput;
}
