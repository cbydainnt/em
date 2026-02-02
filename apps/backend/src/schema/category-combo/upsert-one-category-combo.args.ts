import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateInput } from './category-combo-create.input';
import { CategoryComboUpdateInput } from './category-combo-update.input';

@ArgsType()
export class UpsertOneCategoryComboArgs {

    @Field(() => CategoryComboWhereUniqueInput, {nullable:false})
    @Type(() => CategoryComboWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;

    @Field(() => CategoryComboCreateInput, {nullable:false})
    @Type(() => CategoryComboCreateInput)
    create!: CategoryComboCreateInput;

    @Field(() => CategoryComboUpdateInput, {nullable:false})
    @Type(() => CategoryComboUpdateInput)
    update!: CategoryComboUpdateInput;
}
