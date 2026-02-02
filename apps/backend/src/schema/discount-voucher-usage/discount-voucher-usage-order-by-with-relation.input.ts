import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DiscountVoucherOrderByWithRelationInput } from '../discount-voucher/discount-voucher-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { OrderOrderByWithRelationInput } from '../order/order-order-by-with-relation.input';

@InputType()
export class DiscountVoucherUsageOrderByWithRelationInput {

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

    @Field(() => DiscountVoucherOrderByWithRelationInput, {nullable:true})
    voucher?: DiscountVoucherOrderByWithRelationInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => OrderOrderByWithRelationInput, {nullable:true})
    order?: OrderOrderByWithRelationInput;
}
