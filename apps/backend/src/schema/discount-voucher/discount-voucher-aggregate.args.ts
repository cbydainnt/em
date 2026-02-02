import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherOrderByWithRelationInput } from './discount-voucher-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherWhereUniqueInput } from './discount-voucher-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherCountAggregateInput } from './discount-voucher-count-aggregate.input';
import { DiscountVoucherAvgAggregateInput } from './discount-voucher-avg-aggregate.input';
import { DiscountVoucherSumAggregateInput } from './discount-voucher-sum-aggregate.input';
import { DiscountVoucherMinAggregateInput } from './discount-voucher-min-aggregate.input';
import { DiscountVoucherMaxAggregateInput } from './discount-voucher-max-aggregate.input';

@ArgsType()
export class DiscountVoucherAggregateArgs {

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;

    @Field(() => [DiscountVoucherOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherOrderByWithRelationInput>;

    @Field(() => DiscountVoucherWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherWhereUniqueInput, 'discount_voucher_id' | 'code'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => DiscountVoucherCountAggregateInput, {nullable:true})
    _count?: DiscountVoucherCountAggregateInput;

    @Field(() => DiscountVoucherAvgAggregateInput, {nullable:true})
    _avg?: DiscountVoucherAvgAggregateInput;

    @Field(() => DiscountVoucherSumAggregateInput, {nullable:true})
    _sum?: DiscountVoucherSumAggregateInput;

    @Field(() => DiscountVoucherMinAggregateInput, {nullable:true})
    _min?: DiscountVoucherMinAggregateInput;

    @Field(() => DiscountVoucherMaxAggregateInput, {nullable:true})
    _max?: DiscountVoucherMaxAggregateInput;
}
