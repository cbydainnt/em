import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryComboCreateWithoutComboInput } from './category-combo-create-without-combo.input';
import { Type } from 'class-transformer';
import { CategoryComboCreateOrConnectWithoutComboInput } from './category-combo-create-or-connect-without-combo.input';
import { CategoryComboCreateManyComboInputEnvelope } from './category-combo-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';

@InputType()
export class CategoryComboUncheckedCreateNestedManyWithoutComboInput {

    @Field(() => [CategoryComboCreateWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboCreateWithoutComboInput)
    create?: Array<CategoryComboCreateWithoutComboInput>;

    @Field(() => [CategoryComboCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => CategoryComboCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<CategoryComboCreateOrConnectWithoutComboInput>;

    @Field(() => CategoryComboCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => CategoryComboCreateManyComboInputEnvelope)
    createMany?: CategoryComboCreateManyComboInputEnvelope;

    @Field(() => [CategoryComboWhereUniqueInput], {nullable:true})
    @Type(() => CategoryComboWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>>;
}
