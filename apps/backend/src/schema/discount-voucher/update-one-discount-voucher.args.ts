import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUpdateInput } from './discount-voucher-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';

@ArgsType()
export class UpdateOneDiscountVoucherArgs {

    @Field(() => DiscountVoucherUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateInput)
    data!: DiscountVoucherUpdateInput;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
