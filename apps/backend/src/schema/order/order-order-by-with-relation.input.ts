import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { OrderItemOrderByRelationAggregateInput } from '../order-item/order-item-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { DiscountVoucherOrderByWithRelationInput } from '../discount-voucher/discount-voucher-order-by-with-relation.input';
import { DiscountVoucherUsageOrderByRelationAggregateInput } from '../discount-voucher-usage/discount-voucher-usage-order-by-relation-aggregate.input';

@InputType()
export class OrderOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    order_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    payment_method?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => OrderItemOrderByRelationAggregateInput, {nullable:true})
    order_items?: OrderItemOrderByRelationAggregateInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => DiscountVoucherOrderByWithRelationInput, {nullable:true})
    discount_voucher?: DiscountVoucherOrderByWithRelationInput;

    @Field(() => DiscountVoucherUsageOrderByRelationAggregateInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageOrderByRelationAggregateInput;
}
