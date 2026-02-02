import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Type } from 'class-transformer';
import { CategoryComboUpdateWithoutCategoryInput } from './category-combo-update-without-category.input';

@InputType()
export class CategoryComboUpdateWithWhereUniqueWithoutCategoryInput {

    @Field(() => CategoryComboWhereUniqueInput, {nullable:false})
    @Type(() => CategoryComboWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;

    @Field(() => CategoryComboUpdateWithoutCategoryInput, {nullable:false})
    @Type(() => CategoryComboUpdateWithoutCategoryInput)
    data!: CategoryComboUpdateWithoutCategoryInput;
}
