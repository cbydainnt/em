import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateWithoutCategoryInput } from './category-combo-create-without-category.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateOrConnectWithoutCategoryInput } from './category-combo-create-or-connect-without-category.input';
import { CategoryComboCreateManyCategoryInputEnvelope } from './category-combo-create-many-category-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';

@InputType()
export class CategoryComboUncheckedCreateNestedManyWithoutCategoryInput {

    @Field(() => [CategoryComboCreateWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboCreateWithoutCategoryInput)
    create?: Array<CategoryComboCreateWithoutCategoryInput>;

    @Field(() => [CategoryComboCreateOrConnectWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboCreateOrConnectWithoutCategoryInput)
    connectOrCreate?: Array<CategoryComboCreateOrConnectWithoutCategoryInput>;

    @Field(() => CategoryComboCreateManyCategoryInputEnvelope, {nullable:true})
    @Type(() => CategoryComboCreateManyCategoryInputEnvelope)
    createMany?: CategoryComboCreateManyCategoryInputEnvelope;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;
}
