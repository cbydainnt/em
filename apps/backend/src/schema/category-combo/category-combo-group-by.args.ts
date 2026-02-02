import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboWhereInput } from './category-combo-where.input';
import { Type } from 'class-transformer';
import { CategoryComboOrderByWithAggregationInput } from './category-combo-order-by-with-aggregation.input';
import { CategoryComboScalarFieldEnum } from './category-combo-scalar-field.enum';
import { CategoryComboScalarWhereWithAggregatesInput } from './category-combo-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CategoryComboCountAggregateInput } from './category-combo-count-aggregate.input';
import { CategoryComboMinAggregateInput } from './category-combo-min-aggregate.input';
import { CategoryComboMaxAggregateInput } from './category-combo-max-aggregate.input';

@ArgsType()
export class CategoryComboGroupByArgs {

    @Field(() => CategoryComboWhereInput, {nullable:true})
    @Type(() => CategoryComboWhereInput)
    where?: CategoryComboWhereInput;

    @Field(() => [CategoryComboOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CategoryComboOrderByWithAggregationInput>;

    @Field(() => [CategoryComboScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CategoryComboScalarFieldEnum>;

    @Field(() => CategoryComboScalarWhereWithAggregatesInput, {nullable:true})
    having?: CategoryComboScalarWhereWithAggregatesInput;

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
