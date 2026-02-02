import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateNestedOneWithoutCategoriesInput } from '../combo/combo-create-nested-one-without-categories.input';

@InputType()
export class CategoryComboCreateWithoutCategoryInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => ComboCreateNestedOneWithoutCategoriesInput, {nullable:false})
    combo!: ComboCreateNestedOneWithoutCategoriesInput;
}
