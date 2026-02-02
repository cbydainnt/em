import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CategoryComboOrderByRelationAggregateInput } from '../category-combo/category-combo-order-by-relation-aggregate.input';
import { ComboCourseOrderByRelationAggregateInput } from '../combo-course/combo-course-order-by-relation-aggregate.input';
import { OrderItemOrderByRelationAggregateInput } from '../order-item/order-item-order-by-relation-aggregate.input';
import { DiscountVoucherItemOrderByRelationAggregateInput } from '../discount-voucher-item/discount-voucher-item-order-by-relation-aggregate.input';

@InputType()
export class ComboOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => CategoryComboOrderByRelationAggregateInput, {nullable:true})
    categories?: CategoryComboOrderByRelationAggregateInput;

    @Field(() => ComboCourseOrderByRelationAggregateInput, {nullable:true})
    courses?: ComboCourseOrderByRelationAggregateInput;

    @Field(() => OrderItemOrderByRelationAggregateInput, {nullable:true})
    order_items?: OrderItemOrderByRelationAggregateInput;

    @Field(() => DiscountVoucherItemOrderByRelationAggregateInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemOrderByRelationAggregateInput;
}
