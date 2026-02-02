import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';

@InputType()
export class CartItemScalarWhereWithAggregatesInput {

    @Field(() => [CartItemScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CartItemScalarWhereWithAggregatesInput>;

    @Field(() => [CartItemScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CartItemScalarWhereWithAggregatesInput>;

    @Field(() => [CartItemScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CartItemScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    cart_item_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    user_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    course_id?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    added_at?: DateTimeWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    selected?: BoolWithAggregatesFilter;
}
