import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCategory_idCombo_idCompoundUniqueInput } from './category-combo-category-id-combo-id-compound-unique.input';
import { CategoryComboWhereInput } from './category-combo-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { CategoryRelationFilter } from '../category/category-relation-filter.input';
import { ComboRelationFilter } from '../combo/combo-relation-filter.input';

@InputType()
export class CategoryComboWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CategoryComboCategory_idCombo_idCompoundUniqueInput, {nullable:true})
    category_id_combo_id?: CategoryComboCategory_idCombo_idCompoundUniqueInput;

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    AND?: Array<CategoryComboWhereInput>;

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    OR?: Array<CategoryComboWhereInput>;

    @Field(() => [CategoryComboWhereInput], {nullable:true})
    NOT?: Array<CategoryComboWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    category_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;

    @Field(() => CategoryRelationFilter, {nullable:true})
    category?: CategoryRelationFilter;

    @Field(() => ComboRelationFilter, {nullable:true})
    combo?: ComboRelationFilter;
}
