import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboWhereInput } from './category-combo-where.input';
import { Type } from 'class-transformer';
import { CategoryComboOrderByWithRelationInput } from './category-combo-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CategoryComboScalarFieldEnum } from './category-combo-scalar-field.enum';

@ArgsType()
export class FindFirstCategoryComboArgs {

    @Field(() => CategoryComboWhereInput, {nullable:true})
    @Type(() => CategoryComboWhereInput)
    where?: CategoryComboWhereInput;

    @Field(() => [CategoryComboOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CategoryComboOrderByWithRelationInput>;

    @Field(() => CategoryComboWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CategoryComboWhereUniqueInput, 'id' | 'category_id_combo_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CategoryComboScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CategoryComboScalarFieldEnum>;
}
