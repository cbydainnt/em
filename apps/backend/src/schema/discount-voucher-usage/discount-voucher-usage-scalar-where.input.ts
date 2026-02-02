import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class DiscountVoucherUsageScalarWhereInput {

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUsageScalarWhereInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUsageScalarWhereInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUsageScalarWhereInput>;

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
}
