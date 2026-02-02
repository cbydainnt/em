import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { OrderNullableRelationFilter } from '../order/order-nullable-relation-filter.input';

@InputType()
export class DiscountVoucherUsageWhereInput {

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    voucher_usage_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    order_id?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    used_at?: DateTimeFilter;

    @Field(() => DiscountVoucherRelationFilter, {nullable:true})
    voucher?: DiscountVoucherRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => OrderNullableRelationFilter, {nullable:true})
    order?: OrderNullableRelationFilter;
}
