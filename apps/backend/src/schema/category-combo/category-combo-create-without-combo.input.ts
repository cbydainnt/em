import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryCreateNestedOneWithoutCombosInput } from '../category/category-create-nested-one-without-combos.input';

@InputType()
export class CategoryComboCreateWithoutComboInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CategoryCreateNestedOneWithoutCombosInput, {nullable:false})
    category!: CategoryCreateNestedOneWithoutCombosInput;
}
