import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryCreateNestedOneWithoutCombosInput } from '../category/category-create-nested-one-without-combos.input';
import { ComboCreateNestedOneWithoutCategoriesInput } from '../combo/combo-create-nested-one-without-categories.input';

@InputType()
export class CategoryComboCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CategoryCreateNestedOneWithoutCombosInput, {nullable:false})
    category!: CategoryCreateNestedOneWithoutCombosInput;

    @Field(() => ComboCreateNestedOneWithoutCategoriesInput, {nullable:false})
    combo!: ComboCreateNestedOneWithoutCategoriesInput;
}
