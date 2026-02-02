import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageOrderByWithRelationInput } from './discount-voucher-usage-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUsageCountAggregateInput } from './discount-voucher-usage-count-aggregate.input';
import { DiscountVoucherUsageMinAggregateInput } from './discount-voucher-usage-min-aggregate.input';
import { DiscountVoucherUsageMaxAggregateInput } from './discount-voucher-usage-max-aggregate.input';

@ArgsType()
export class DiscountVoucherUsageAggregateArgs {

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

    @Field(() => DiscountVoucherUsageCountAggregateInput, {nullable:true})
    _count?: DiscountVoucherUsageCountAggregateInput;

    @Field(() => DiscountVoucherUsageMinAggregateInput, {nullable:true})
    _min?: DiscountVoucherUsageMinAggregateInput;

    @Field(() => DiscountVoucherUsageMaxAggregateInput, {nullable:true})
    _max?: DiscountVoucherUsageMaxAggregateInput;
}
