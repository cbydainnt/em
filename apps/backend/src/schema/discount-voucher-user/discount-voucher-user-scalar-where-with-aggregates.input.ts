import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class DiscountVoucherUserScalarWhereWithAggregatesInput {

    @Field(() => [DiscountVoucherUserScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DiscountVoucherUserScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherUserScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DiscountVoucherUserScalarWhereWithAggregatesInput>;

    @Field(() => [DiscountVoucherUserScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DiscountVoucherUserScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    discount_voucher_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    user_id?: StringWithAggregatesFilter;
}
