import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ComboCountAggregate } from './combo-count-aggregate.output';
import { ComboAvgAggregate } from './combo-avg-aggregate.output';
import { ComboSumAggregate } from './combo-sum-aggregate.output';
import { ComboMinAggregate } from './combo-min-aggregate.output';
import { ComboMaxAggregate } from './combo-max-aggregate.output';

@ObjectType()
export class ComboGroupBy {

    @Field(() => String, {nullable:false})
    combo_id!: string;

    @Field(() => String, {nullable:false})
    combo_name!: string;

    @Field(() => Int, {nullable:false})
    combo_type!: number;

    @Field(() => Int, {nullable:false})
    original_price!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => ComboCountAggregate, {nullable:true})
    _count?: ComboCountAggregate;

    @Field(() => ComboAvgAggregate, {nullable:true})
    _avg?: ComboAvgAggregate;

    @Field(() => ComboSumAggregate, {nullable:true})
    _sum?: ComboSumAggregate;

    @Field(() => ComboMinAggregate, {nullable:true})
    _min?: ComboMinAggregate;

    @Field(() => ComboMaxAggregate, {nullable:true})
    _max?: ComboMaxAggregate;
}
