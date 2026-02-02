import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';

@InputType()
export class DiscountVoucherItemScalarWhereWithAggregatesInput {

    @Field(() => [DiscountVoucherItemScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DiscountVoucherItemScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherItemScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DiscountVoucherItemScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherItemScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DiscountVoucherItemScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    discount_voucher_id?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    course_id?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    combo_id?: StringNullableWithAggregatesFilter;
}
