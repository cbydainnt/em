import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DiscountVoucherUsageCountOrderByAggregateInput } from './discount-voucher-usage-count-order-by-aggregate.input';
import { DiscountVoucherUsageMaxOrderByAggregateInput } from './discount-voucher-usage-max-order-by-aggregate.input';
import { DiscountVoucherUsageMinOrderByAggregateInput } from './discount-voucher-usage-min-order-by-aggregate.input';

@InputType()
export class DiscountVoucherUsageOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    voucher_usage_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    used_at?: keyof typeof SortOrder;

    @Field(() => DiscountVoucherUsageCountOrderByAggregateInput, {nullable:true})
    _count?: DiscountVoucherUsageCountOrderByAggregateInput;

    @Field(() => DiscountVoucherUsageMaxOrderByAggregateInput, {nullable:true})
    _max?: DiscountVoucherUsageMaxOrderByAggregateInput;

    @Field(() => DiscountVoucherUsageMinOrderByAggregateInput, {nullable:true})
    _min?: DiscountVoucherUsageMinOrderByAggregateInput;
}
