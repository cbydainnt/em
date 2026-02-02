import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageUpdateInput } from './discount-voucher-usage-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';

@ArgsType()
export class UpdateOneDiscountVoucherUsageArgs {

    @Field(() => DiscountVoucherUsageUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateInput)
    data!: DiscountVoucherUsageUpdateInput;

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;
}
