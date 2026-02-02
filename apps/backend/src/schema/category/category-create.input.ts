import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryComboCreateNestedManyWithoutCategoryInput } from '../category-combo/category-combo-create-nested-many-without-category.input';

@InputType()
export class CategoryCreateInput {

    @Field(() => String, {nullable:true})
    category_id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => Int, {nullable:true})
    sort_order?: number;

    @Field(() => CategoryComboCreateNestedManyWithoutCategoryInput, {nullable:true})
    combos?: CategoryComboCreateNestedManyWithoutCategoryInput;
}
