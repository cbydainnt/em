import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageUpdateWithoutUserInput } from './discount-voucher-usage-update-without-user.input';

@InputType()
export class DiscountVoucherUsageUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUsageUpdateWithoutUserInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateWithoutUserInput)
    data!: DiscountVoucherUsageUpdateWithoutUserInput;
}
