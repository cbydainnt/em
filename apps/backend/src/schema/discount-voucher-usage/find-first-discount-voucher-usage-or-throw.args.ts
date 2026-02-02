import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageOrderByWithRelationInput } from './discount-voucher-usage-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUsageScalarFieldEnum } from './discount-voucher-usage-scalar-field.enum';

@ArgsType()
export class FindFirstDiscountVoucherUsageOrThrowArgs {

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUsageWhereInput)
    where?: DiscountVoucherUsageWhereInput;

    @Field(() => [DiscountVoucherUsageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherUsageOrderByWithRelationInput>;

    @Field(() => DiscountVoucherUsageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [DiscountVoucherUsageScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof DiscountVoucherUsageScalarFieldEnum>;
}
