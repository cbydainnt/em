import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateWithoutCategoryInput } from './category-combo-create-without-category.input';

@InputType()
export class CategoryComboCreateOrConnectWithoutCategoryInput {

    @Field(() => CategoryComboWhereUniqueInput, {nullable:false})
    @Type(() => CategoryComboWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;

    @Field(() => CategoryComboCreateWithoutCategoryInput, {nullable:false})
    @Type(() => CategoryComboCreateWithoutCategoryInput)
    create!: CategoryComboCreateWithoutCategoryInput;
}
