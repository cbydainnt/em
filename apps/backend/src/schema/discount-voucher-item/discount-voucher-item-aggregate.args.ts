import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemOrderByWithRelationInput } from './discount-voucher-item-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherItemCountAggregateInput } from './discount-voucher-item-count-aggregate.input';
import { DiscountVoucherItemMinAggregateInput } from './discount-voucher-item-min-aggregate.input';
import { DiscountVoucherItemMaxAggregateInput } from './discount-voucher-item-max-aggregate.input';

@ArgsType()
export class DiscountVoucherItemAggregateArgs {

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    @Type(() => DiscountVoucherItemWhereInput)
    where?: DiscountVoucherItemWhereInput;

    @Field(() => [DiscountVoucherItemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherItemOrderByWithRelationInput>;

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

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
