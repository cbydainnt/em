import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageUpdateWithoutVoucherInput } from './discount-voucher-usage-update-without-voucher.input';
import { DiscountVoucherUsageCreateWithoutVoucherInput } from './discount-voucher-usage-create-without-voucher.input';

@InputType()
export class DiscountVoucherUsageUpsertWithWhereUniqueWithoutVoucherInput {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageUpdateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateWithoutVoucherInput)
    update!: DiscountVoucherUsageUpdateWithoutVoucherInput;

    @Field(() => DiscountVoucherUsageCreateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateWithoutVoucherInput)
    create!: DiscountVoucherUsageCreateWithoutVoucherInput;
}
