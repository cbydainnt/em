import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class DiscountVoucherUsageScalarWhereWithAggregatesInput {

    @Field(() => [DiscountVoucherUsageScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DiscountVoucherUsageScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DiscountVoucherUsageScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DiscountVoucherUsageScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    voucher_usage_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    discount_voucher_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    user_id?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    order_id?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    used_at?: DateTimeWithAggregatesFilter;
}
