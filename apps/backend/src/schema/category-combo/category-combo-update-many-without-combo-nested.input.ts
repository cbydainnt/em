import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateWithoutComboInput } from './category-combo-create-without-combo.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateOrConnectWithoutComboInput } from './category-combo-create-or-connect-without-combo.input';
import { CategoryComboUpsertWithWhereUniqueWithoutComboInput } from './category-combo-upsert-with-where-unique-without-combo.input';
import { CategoryComboCreateManyComboInputEnvelope } from './category-combo-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { CategoryComboUpdateWithWhereUniqueWithoutComboInput } from './category-combo-update-with-where-unique-without-combo.input';
import { CategoryComboUpdateManyWithWhereWithoutComboInput } from './category-combo-update-many-with-where-without-combo.input';
import { CategoryComboScalarWhereInput } from './category-combo-scalar-where.input';

@InputType()
export class CategoryComboUpdateManyWithoutComboNestedInput {

    @Field(() => [CategoryComboCreateWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboCreateWithoutComboInput)
    create?: Array<CategoryComboCreateWithoutComboInput>;

    @Field(() => [CategoryComboCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<CategoryComboCreateOrConnectWithoutComboInput>;

    @Field(() => [CategoryComboUpsertWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboUpsertWithWhereUniqueWithoutComboInput)
    upsert?: Array<CategoryComboUpsertWithWhereUniqueWithoutComboInput>;

    @Field(() => CategoryComboCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => CategoryComboCreateManyComboInputEnvelope)
    createMany?: CategoryComboCreateManyComboInputEnvelope;

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

    @Field(() => [CategoryComboUpdateWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboUpdateWithWhereUniqueWithoutComboInput)
    update?: Array<CategoryComboUpdateWithWhereUniqueWithoutComboInput>;

    @Field(() => [CategoryComboUpdateManyWithWhereWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboUpdateManyWithWhereWithoutComboInput)
    updateMany?: Array<CategoryComboUpdateManyWithWhereWithoutComboInput>;

    @Field(() => [CategoryComboScalarWhereInput], {nullable:true})
    @Type(() => CategoryComboScalarWhereInput)
    deleteMany?: Array<CategoryComboScalarWhereInput>;
}
