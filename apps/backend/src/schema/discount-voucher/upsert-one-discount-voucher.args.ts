import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherCreateInput } from './discount-voucher-create.input';
import { DiscountVoucherUpdateInput } from './discount-voucher-update.input';

@ArgsType()
export class UpsertOneDiscountVoucherArgs {

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => DiscountVoucherCreateInput, {nullable:false})
    @Type(() => DiscountVoucherCreateInput)
    create!: DiscountVoucherCreateInput;

    @Field(() => DiscountVoucherUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateInput)
    update!: DiscountVoucherUpdateInput;
}
