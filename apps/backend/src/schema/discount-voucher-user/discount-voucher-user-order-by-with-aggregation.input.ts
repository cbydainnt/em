import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DiscountVoucherUserCountOrderByAggregateInput } from './discount-voucher-user-count-order-by-aggregate.input';
import { DiscountVoucherUserMaxOrderByAggregateInput } from './discount-voucher-user-max-order-by-aggregate.input';
import { DiscountVoucherUserMinOrderByAggregateInput } from './discount-voucher-user-min-order-by-aggregate.input';

@InputType()
export class DiscountVoucherUserOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => DiscountVoucherUserCountOrderByAggregateInput, {nullable:true})
    _count?: DiscountVoucherUserCountOrderByAggregateInput;

    @Field(() => DiscountVoucherUserMaxOrderByAggregateInput, {nullable:true})
    _max?: DiscountVoucherUserMaxOrderByAggregateInput;

    @Field(() => DiscountVoucherUserMinOrderByAggregateInput, {nullable:true})
    _min?: DiscountVoucherUserMinOrderByAggregateInput;
}
