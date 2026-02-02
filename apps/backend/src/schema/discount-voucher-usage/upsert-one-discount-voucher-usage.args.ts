import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateInput } from './discount-voucher-usage-create.input';
import { DiscountVoucherUsageUpdateInput } from './discount-voucher-usage-update.input';

@ArgsType()
export class UpsertOneDiscountVoucherUsageArgs {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageCreateInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateInput)
    create!: DiscountVoucherUsageCreateInput;

    @Field(() => DiscountVoucherUsageUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateInput)
    update!: DiscountVoucherUsageUpdateInput;
}
