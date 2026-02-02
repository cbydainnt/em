import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutApplicable_usersInput } from './discount-voucher-create-without-applicable-users.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutApplicable_usersInput } from './discount-voucher-create-or-connect-without-applicable-users.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';

@InputType()
export class DiscountVoucherCreateNestedOneWithoutApplicable_usersInput {

    @Field(() => DiscountVoucherCreateWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutApplicable_usersInput)
    create?: DiscountVoucherCreateWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutApplicable_usersInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
