import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DiscountVoucherItemCountOrderByAggregateInput } from './discount-voucher-item-count-order-by-aggregate.input';
import { DiscountVoucherItemMaxOrderByAggregateInput } from './discount-voucher-item-max-order-by-aggregate.input';
import { DiscountVoucherItemMinOrderByAggregateInput } from './discount-voucher-item-min-order-by-aggregate.input';

@InputType()
export class DiscountVoucherItemOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => DiscountVoucherItemCountOrderByAggregateInput, {nullable:true})
    _count?: DiscountVoucherItemCountOrderByAggregateInput;

    @Field(() => DiscountVoucherItemMaxOrderByAggregateInput, {nullable:true})
    _max?: DiscountVoucherItemMaxOrderByAggregateInput;

    @Field(() => DiscountVoucherItemMinOrderByAggregateInput, {nullable:true})
    _min?: DiscountVoucherItemMinOrderByAggregateInput;
}
