import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateWithoutComboInput } from './category-combo-create-without-combo.input';

@InputType()
export class CategoryComboCreateOrConnectWithoutComboInput {

    @Field(() => CategoryComboWhereUniqueInput, {nullable:false})
    @Type(() => CategoryComboWhereUniqueInput)
    where!: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;

    @Field(() => CategoryComboCreateWithoutComboInput, {nullable:false})
    @Type(() => CategoryComboCreateWithoutComboInput)
    create!: CategoryComboCreateWithoutComboInput;
}
