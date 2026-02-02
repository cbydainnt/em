import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageOrderByWithAggregationInput } from './discount-voucher-usage-order-by-with-aggregation.input';
import { DiscountVoucherUsageScalarFieldEnum } from './discount-voucher-usage-scalar-field.enum';
import { DiscountVoucherUsageScalarWhereWithAggregatesInput } from './discount-voucher-usage-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUsageCountAggregateInput } from './discount-voucher-usage-count-aggregate.input';
import { DiscountVoucherUsageMinAggregateInput } from './discount-voucher-usage-min-aggregate.input';
import { DiscountVoucherUsageMaxAggregateInput } from './discount-voucher-usage-max-aggregate.input';

@ArgsType()
export class DiscountVoucherUsageGroupByArgs {

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUsageWhereInput)
    where?: DiscountVoucherUsageWhereInput;

    @Field(() => [DiscountVoucherUsageOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherUsageOrderByWithAggregationInput>;

    @Field(() => [DiscountVoucherUsageScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof DiscountVoucherUsageScalarFieldEnum>;

    @Field(() => DiscountVoucherUsageScalarWhereWithAggregatesInput, {nullable:true})
    having?: DiscountVoucherUsageScalarWhereWithAggregatesInput;

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
