import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutApplicable_usersInput } from './discount-voucher-create-without-applicable-users.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutApplicable_usersInput } from './discount-voucher-create-or-connect-without-applicable-users.input';
import { DiscountVoucherUpsertWithoutApplicable_usersInput } from './discount-voucher-upsert-without-applicable-users.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { DiscountVoucherUpdateToOneWithWhereWithoutApplicable_usersInput } from './discount-voucher-update-to-one-with-where-without-applicable-users.input';

@InputType()
export class DiscountVoucherUpdateOneRequiredWithoutApplicable_usersNestedInput {

    @Field(() => DiscountVoucherCreateWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutApplicable_usersInput)
    create?: DiscountVoucherCreateWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutApplicable_usersInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherUpsertWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherUpsertWithoutApplicable_usersInput)
    upsert?: DiscountVoucherUpsertWithoutApplicable_usersInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherUpdateToOneWithWhereWithoutApplicable_usersInput, {nullable:true})
    @Type(() => DiscountVoucherUpdateToOneWithWhereWithoutApplicable_usersInput)
    update?: DiscountVoucherUpdateToOneWithWhereWithoutApplicable_usersInput;
}
