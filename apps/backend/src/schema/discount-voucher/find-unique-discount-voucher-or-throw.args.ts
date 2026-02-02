import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueDiscountVoucherOrThrowArgs {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;
}
