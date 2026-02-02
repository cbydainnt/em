import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboUpdateOneRequiredWithoutCategoriesNestedInput } from '../combo/combo-update-one-required-without-categories-nested.input';

@InputType()
export class CategoryComboUpdateWithoutCategoryInput {

    @Field(() => ComboUpdateOneRequiredWithoutCategoriesNestedInput, {nullable:true})
    combo?: ComboUpdateOneRequiredWithoutCategoriesNestedInput;
}
