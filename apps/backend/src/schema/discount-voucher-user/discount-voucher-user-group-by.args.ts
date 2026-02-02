import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserOrderByWithAggregationInput } from './discount-voucher-user-order-by-with-aggregation.input';
import { DiscountVoucherUserScalarFieldEnum } from './discount-voucher-user-scalar-field.enum';
import { DiscountVoucherUserScalarWhereWithAggregatesInput } from './discount-voucher-user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUserCountAggregateInput } from './discount-voucher-user-count-aggregate.input';
import { DiscountVoucherUserMinAggregateInput } from './discount-voucher-user-min-aggregate.input';
import { DiscountVoucherUserMaxAggregateInput } from './discount-voucher-user-max-aggregate.input';

@ArgsType()
export class DiscountVoucherUserGroupByArgs {

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUserWhereInput)
    where?: DiscountVoucherUserWhereInput;

    @Field(() => [DiscountVoucherUserOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherUserOrderByWithAggregationInput>;

    @Field(() => [DiscountVoucherUserScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof DiscountVoucherUserScalarFieldEnum>;

    @Field(() => DiscountVoucherUserScalarWhereWithAggregatesInput, {nullable:true})
    having?: DiscountVoucherUserScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => DiscountVoucherUserCountAggregateInput, {nullable:true})
    _count?: DiscountVoucherUserCountAggregateInput;

    @Field(() => DiscountVoucherUserMinAggregateInput, {nullable:true})
    _min?: DiscountVoucherUserMinAggregateInput;

    @Field(() => DiscountVoucherUserMaxAggregateInput, {nullable:true})
    _max?: DiscountVoucherUserMaxAggregateInput;
}
