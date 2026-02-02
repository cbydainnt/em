import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserOrderByWithRelationInput } from './discount-voucher-user-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherUserCountAggregateInput } from './discount-voucher-user-count-aggregate.input';
import { DiscountVoucherUserMinAggregateInput } from './discount-voucher-user-min-aggregate.input';
import { DiscountVoucherUserMaxAggregateInput } from './discount-voucher-user-max-aggregate.input';

@ArgsType()
export class DiscountVoucherUserAggregateArgs {

    @Field(() => DiscountVoucherUserWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUserWhereInput)
    where?: DiscountVoucherUserWhereInput;

    @Field(() => [DiscountVoucherUserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DiscountVoucherUserOrderByWithRelationInput>;

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

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
