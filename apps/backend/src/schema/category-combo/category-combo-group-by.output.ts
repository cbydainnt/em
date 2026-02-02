import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CategoryComboCountAggregate } from './category-combo-count-aggregate.output';
import { CategoryComboMinAggregate } from './category-combo-min-aggregate.output';
import { CategoryComboMaxAggregate } from './category-combo-max-aggregate.output';

@ObjectType()
export class CategoryComboGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    category_id!: string;

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => CategoryComboCountAggregate, {nullable:true})
    _count?: CategoryComboCountAggregate;

    @Field(() => CategoryComboMinAggregate, {nullable:true})
    _min?: CategoryComboMinAggregate;

    @Field(() => CategoryComboMaxAggregate, {nullable:true})
    _max?: CategoryComboMaxAggregate;
}
