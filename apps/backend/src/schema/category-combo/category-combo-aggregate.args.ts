import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboWhereInput } from './category-combo-where.input';
import { Type } from 'class-transformer';
import { CategoryComboOrderByWithRelationInput } from './category-combo-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CategoryComboWhereUniqueInput } from './category-combo-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CategoryComboCountAggregateInput } from './category-combo-count-aggregate.input';
import { CategoryComboMinAggregateInput } from './category-combo-min-aggregate.input';
import { CategoryComboMaxAggregateInput } from './category-combo-max-aggregate.input';

@ArgsType()
export class CategoryComboAggregateArgs {

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

    @Field(() => CategoryComboCountAggregateInput, {nullable:true})
    _count?: CategoryComboCountAggregateInput;

    @Field(() => CategoryComboMinAggregateInput, {nullable:true})
    _min?: CategoryComboMinAggregateInput;

    @Field(() => CategoryComboMaxAggregateInput, {nullable:true})
    _max?: CategoryComboMaxAggregateInput;
}
