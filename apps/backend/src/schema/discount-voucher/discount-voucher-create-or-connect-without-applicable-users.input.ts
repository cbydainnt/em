import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateWithoutApplicable_usersInput } from './discount-voucher-create-without-applicable-users.input';

@InputType()
export class DiscountVoucherCreateOrConnectWithoutApplicable_usersInput {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherCreateWithoutApplicable_usersInput, {nullable:false})
    @Type(() => DiscountVoucherCreateWithoutApplicable_usersInput)
    create!: DiscountVoucherCreateWithoutApplicable_usersInput;
}
