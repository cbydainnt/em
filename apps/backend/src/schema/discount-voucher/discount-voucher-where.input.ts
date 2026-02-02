import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DiscountVoucherItemListRelationFilter } from '../discount-voucher-item/discount-voucher-item-list-relation-filter.input';
import { DiscountVoucherUserListRelationFilter } from '../discount-voucher-user/discount-voucher-user-list-relation-filter.input';
import { DiscountVoucherUsageListRelationFilter } from '../discount-voucher-usage/discount-voucher-usage-list-relation-filter.input';
import { OrderListRelationFilter } from '../order/order-list-relation-filter.input';

@InputType()
export class DiscountVoucherWhereInput {

    @Field(() => [DiscountVoucherWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherWhereInput>;

    @Field(() => [DiscountVoucherWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherWhereInput>;

    @Field(() => [DiscountVoucherWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    code?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    discount_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    discount_value?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    min_order_amount?: IntNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    applicable_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    user_scope?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    start_date?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    end_date?: DateTimeNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    usage_limit?: IntNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    used_count?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    per_user_limit?: IntNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => DiscountVoucherItemListRelationFilter, {nullable:true})
    applicable_items?: DiscountVoucherItemListRelationFilter;

    @Field(() => DiscountVoucherUserListRelationFilter, {nullable:true})
    applicable_users?: DiscountVoucherUserListRelationFilter;

    @Field(() => DiscountVoucherUsageListRelationFilter, {nullable:true})
    used_by?: DiscountVoucherUsageListRelationFilter;

    @Field(() => OrderListRelationFilter, {nullable:true})
    order?: OrderListRelationFilter;
}
