import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemOrderByWithAggregationInput } from './discount-voucher-item-order-by-with-aggregation.input';
import { DiscountVoucherItemScalarFieldEnum } from './discount-voucher-item-scalar-field.enum';
import { DiscountVoucherItemScalarWhereWithAggregatesInput } from './discount-voucher-item-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherItemCountAggregateInput } from './discount-voucher-item-count-aggregate.input';
import { DiscountVoucherItemMinAggregateInput } from './discount-voucher-item-min-aggregate.input';
import { DiscountVoucherItemMaxAggregateInput } from './discount-voucher-item-max-aggregate.input';

@ArgsType()
export class DiscountVoucherItemGroupByArgs {

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    @Type(() => DiscountVoucherItemWhereInput)
    where?: DiscountVoucherItemWhereInput;

    @Field(() => [DiscountVoucherItemOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherItemOrderByWithAggregationInput>;

    @Field(() => [DiscountVoucherItemScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof DiscountVoucherItemScalarFieldEnum>;

    @Field(() => DiscountVoucherItemScalarWhereWithAggregatesInput, {nullable:true})
    having?: DiscountVoucherItemScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => DiscountVoucherItemCountAggregateInput, {nullable:true})
    _count?: DiscountVoucherItemCountAggregateInput;

    @Field(() => DiscountVoucherItemMinAggregateInput, {nullable:true})
    _min?: DiscountVoucherItemMinAggregateInput;

    @Field(() => DiscountVoucherItemMaxAggregateInput, {nullable:true})
    _max?: DiscountVoucherItemMaxAggregateInput;
}
