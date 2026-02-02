import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboUpdateInput } from './category-combo-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';

@ArgsType()
export class UpdateOneCategoryComboArgs {

    @Field(() => CategoryComboUpdateInput, {nullable:false})
    @Type(() => CategoryComboUpdateInput)
    data!: CategoryComboUpdateInput;

    @Field(() => CategoryComboWhereUniqueInput, {nullable:false})
    @Type(() => CategoryComboWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;
}
