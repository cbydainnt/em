import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class CategoryComboScalarWhereWithAggregatesInput {

    @Field(() => [CategoryComboScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CategoryComboScalarWhereWithAggregatesInput>;

    @Field(() => [CategoryComboScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CategoryComboScalarWhereWithAggregatesInput>;

    @Field(() => [CategoryComboScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CategoryComboScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    category_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    combo_id?: StringWithAggregatesFilter;
}
