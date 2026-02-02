import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateWithoutCategoryInput } from './category-combo-create-without-category.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateOrConnectWithoutCategoryInput } from './category-combo-create-or-connect-without-category.input';
import { CategoryComboUpsertWithWhereUniqueWithoutCategoryInput } from './category-combo-upsert-with-where-unique-without-category.input';
import { CategoryComboCreateManyCategoryInputEnvelope } from './category-combo-create-many-category-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { CategoryComboUpdateWithWhereUniqueWithoutCategoryInput } from './category-combo-update-with-where-unique-without-category.input';
import { CategoryComboUpdateManyWithWhereWithoutCategoryInput } from './category-combo-update-many-with-where-without-category.input';
import { CategoryComboScalarWhereInput } from './category-combo-scalar-where.input';

@InputType()
export class CategoryComboUncheckedUpdateManyWithoutCategoryNestedInput {

    @Field(() => [CategoryComboCreateWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboCreateWithoutCategoryInput)
    create?: Array<CategoryComboCreateWithoutCategoryInput>;

    @Field(() => [CategoryComboCreateOrConnectWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboCreateOrConnectWithoutCategoryInput)
    connectOrCreate?: Array<CategoryComboCreateOrConnectWithoutCategoryInput>;

    @Field(() => [CategoryComboUpsertWithWhereUniqueWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboUpsertWithWhereUniqueWithoutCategoryInput)
    upsert?: Array<CategoryComboUpsertWithWhereUniqueWithoutCategoryInput>;

    @Field(() => CategoryComboCreateManyCategoryInputEnvelope, {nullable:true})
    @Type(() => CategoryComboCreateManyCategoryInputEnvelope)
    createMany?: CategoryComboCreateManyCategoryInputEnvelope;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;

    @Field(() => [CategoryComboUpdateWithWhereUniqueWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboUpdateWithWhereUniqueWithoutCategoryInput)
    update?: Array<CategoryComboUpdateWithWhereUniqueWithoutCategoryInput>;

    @Field(() => [CategoryComboUpdateManyWithWhereWithoutCategoryInput], {nullable:true})
    @Type(() => CategoryComboUpdateManyWithWhereWithoutCategoryInput)
    updateMany?: Array<CategoryComboUpdateManyWithWhereWithoutCategoryInput>;

    @Field(() => [CategoryComboScalarWhereInput], {nullable:true})
    @Type(() => CategoryComboScalarWhereInput)
    deleteMany?: Array<CategoryComboScalarWhereInput>;
}
