import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderWhereInput } from './order-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { OrderItemListRelationFilter } from '../order-item/order-item-list-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { DiscountVoucherNullableRelationFilter } from '../discount-voucher/discount-voucher-nullable-relation-filter.input';
import { DiscountVoucherUsageListRelationFilter } from '../discount-voucher-usage/discount-voucher-usage-list-relation-filter.input';

@InputType()
export class OrderWhereUniqueInput {

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => [OrderWhereInput], {nullable:true})
    AND?: Array<OrderWhereInput>;

    @Field(() => [OrderWhereInput], {nullable:true})
    OR?: Array<OrderWhereInput>;

    @Field(() => [OrderWhereInput], {nullable:true})
    NOT?: Array<OrderWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    total_price?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    payment_method?: IntNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    updated_at?: DateTimeNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    discount_voucher_id?: StringNullableFilter;

    @Field(() => OrderItemListRelationFilter, {nullable:true})
    order_items?: OrderItemListRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => DiscountVoucherNullableRelationFilter, {nullable:true})
    discount_voucher?: DiscountVoucherNullableRelationFilter;

    @Field(() => DiscountVoucherUsageListRelationFilter, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageListRelationFilter;
}
