import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ComboCountAggregate } from './combo-count-aggregate.output';
import { ComboAvgAggregate } from './combo-avg-aggregate.output';
import { ComboSumAggregate } from './combo-sum-aggregate.output';
import { ComboMinAggregate } from './combo-min-aggregate.output';
import { ComboMaxAggregate } from './combo-max-aggregate.output';

@ObjectType()
export class AggregateCombo {

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
