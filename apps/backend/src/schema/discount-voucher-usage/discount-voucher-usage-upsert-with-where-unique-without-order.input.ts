import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageUpdateWithoutOrderInput } from './discount-voucher-usage-update-without-order.input';
import { DiscountVoucherUsageCreateWithoutOrderInput } from './discount-voucher-usage-create-without-order.input';

@InputType()
export class DiscountVoucherUsageUpsertWithWhereUniqueWithoutOrderInput {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageUpdateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateWithoutOrderInput)
    update!: DiscountVoucherUsageUpdateWithoutOrderInput;

    @Field(() => DiscountVoucherUsageCreateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateWithoutOrderInput)
    create!: DiscountVoucherUsageCreateWithoutOrderInput;
}
