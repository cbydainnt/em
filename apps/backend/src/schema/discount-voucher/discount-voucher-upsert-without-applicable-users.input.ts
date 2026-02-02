import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateWithoutApplicable_usersInput } from './discount-voucher-update-without-applicable-users.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutApplicable_usersInput } from './discount-voucher-create-without-applicable-users.input';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@InputType()
export class DiscountVoucherUpsertWithoutApplicable_usersInput {

    @Field(() => DiscountVoucherUpdateWithoutApplicable_usersInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateWithoutApplicable_usersInput)
    update!: DiscountVoucherUpdateWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherCreateWithoutApplicable_usersInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutApplicable_usersInput)
    create!: DiscountVoucherCreateWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
