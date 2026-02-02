import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutApplicable_itemsInput } from './discount-voucher-create-without-applicable-items.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput } from './discount-voucher-create-or-connect-without-applicable-items.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';

@InputType()
export class DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput {

    @Field(() => DiscountVoucherCreateWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutApplicable_itemsInput)
    create?: DiscountVoucherCreateWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
