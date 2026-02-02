import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryUpdateOneRequiredWithoutCombosNestedInput } from '../category/category-update-one-required-without-combos-nested.input';

@InputType()
export class CategoryComboUpdateWithoutComboInput {

    @Field(() => CategoryUpdateOneRequiredWithoutCombosNestedInput, {nullable:true})
    category?: CategoryUpdateOneRequiredWithoutCombosNestedInput;
}
