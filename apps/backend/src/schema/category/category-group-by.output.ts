import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryCountAggregate } from './category-count-aggregate.output';
import { CategoryAvgAggregate } from './category-avg-aggregate.output';
import { CategorySumAggregate } from './category-sum-aggregate.output';
import { CategoryMinAggregate } from './category-min-aggregate.output';
import { CategoryMaxAggregate } from './category-max-aggregate.output';

@ObjectType()
export class CategoryGroupBy {

    @Field(() => String, {nullable:false})
    category_id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => Int, {nullable:false})
    sort_order!: number;

    @Field(() => CategoryCountAggregate, {nullable:true})
    _count?: CategoryCountAggregate;

    @Field(() => CategoryAvgAggregate, {nullable:true})
    _avg?: CategoryAvgAggregate;

    @Field(() => CategorySumAggregate, {nullable:true})
    _sum?: CategorySumAggregate;

    @Field(() => CategoryMinAggregate, {nullable:true})
    _min?: CategoryMinAggregate;

    @Field(() => CategoryMaxAggregate, {nullable:true})
    _max?: CategoryMaxAggregate;
}
