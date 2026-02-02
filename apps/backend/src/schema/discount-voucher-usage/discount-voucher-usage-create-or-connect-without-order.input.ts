import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateWithoutOrderInput } from './discount-voucher-usage-create-without-order.input';

@InputType()
export class DiscountVoucherUsageCreateOrConnectWithoutOrderInput {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageCreateWithoutOrderInput, {nullable:false})
    @Type(() => DiscountVoucherUsageCreateWithoutOrderInput)
    create!: DiscountVoucherUsageCreateWithoutOrderInput;
}
