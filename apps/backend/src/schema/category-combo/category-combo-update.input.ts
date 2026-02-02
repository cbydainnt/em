import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryUpdateOneRequiredWithoutCombosNestedInput } from '../category/category-update-one-required-without-combos-nested.input';
import { ComboUpdateOneRequiredWithoutCategoriesNestedInput } from '../combo/combo-update-one-required-without-categories-nested.input';

@InputType()
export class CategoryComboUpdateInput {

    @Field(() => CategoryUpdateOneRequiredWithoutCombosNestedInput, {nullable:true})
    category?: CategoryUpdateOneRequiredWithoutCombosNestedInput;

    @Field(() => ComboUpdateOneRequiredWithoutCategoriesNestedInput, {nullable:true})
    combo?: ComboUpdateOneRequiredWithoutCategoriesNestedInput;
}
