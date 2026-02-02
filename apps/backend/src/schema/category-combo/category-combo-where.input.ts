import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { CategoryRelationFilter } from '../category/category-relation-filter.input';
import { ComboRelationFilter } from '../combo/combo-relation-filter.input';

@InputType()
export class CategoryComboWhereInput {

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    AND?: Array<CategoryComboWhereInput>;

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    OR?: Array<CategoryComboWhereInput>;

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    NOT?: Array<CategoryComboWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    category_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;

    @Field(() => CategoryRelationFilter, {nullable:true})
    category?: CategoryRelationFilter;

    @Field(() => ComboRelationFilter, {nullable:true})
    combo?: ComboRelationFilter;
}
