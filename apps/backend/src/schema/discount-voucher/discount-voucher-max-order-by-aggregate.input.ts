import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class DiscountVoucherMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    discount_voucher_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discount_value?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    min_order_amount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    applicable_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_scope?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    start_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    end_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usage_limit?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    used_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    per_user_limit?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;
}
