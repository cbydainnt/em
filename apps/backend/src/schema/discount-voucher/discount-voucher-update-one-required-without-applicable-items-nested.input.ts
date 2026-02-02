import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateWithoutApplicable_itemsInput } from './discount-voucher-create-without-applicable-items.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput } from './discount-voucher-create-or-connect-without-applicable-items.input';
import { DiscountVoucherUpsertWithoutApplicable_itemsInput } from './discount-voucher-upsert-without-applicable-items.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { DiscountVoucherUpdateToOneWithWhereWithoutApplicable_itemsInput } from './discount-voucher-update-to-one-with-where-without-applicable-items.input';

@InputType()
export class DiscountVoucherUpdateOneRequiredWithoutApplicable_itemsNestedInput {

    @Field(() => DiscountVoucherCreateWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherCreateWithoutApplicable_itemsInput)
    create?: DiscountVoucherCreateWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput)
    connectOrCreate?: DiscountVoucherCreateOrConnectWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherUpsertWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherUpsertWithoutApplicable_itemsInput)
    upsert?: DiscountVoucherUpsertWithoutApplicable_itemsInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    @Type(() => DiscountVoucherWhereUniqueInput)
    connect?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherUpdateToOneWithWhereWithoutApplicable_itemsInput, {nullable:true})
    @Type(() => DiscountVoucherUpdateToOneWithWhereWithoutApplicable_itemsInput)
    update?: DiscountVoucherUpdateToOneWithWhereWithoutApplicable_itemsInput;
}
