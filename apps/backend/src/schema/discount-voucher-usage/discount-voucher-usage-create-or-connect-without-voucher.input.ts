import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateWithoutVoucherInput } from './discount-voucher-usage-create-without-voucher.input';

@InputType()
export class DiscountVoucherUsageCreateOrConnectWithoutVoucherInput {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageCreateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateWithoutVoucherInput)
    create!: DiscountVoucherUsageCreateWithoutVoucherInput;
}
