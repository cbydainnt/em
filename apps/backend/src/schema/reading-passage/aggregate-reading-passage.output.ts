import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ReadingPassageCountAggregate } from './reading-passage-count-aggregate.output';
import { ReadingPassageAvgAggregate } from './reading-passage-avg-aggregate.output';
import { ReadingPassageSumAggregate } from './reading-passage-sum-aggregate.output';
import { ReadingPassageMinAggregate } from './reading-passage-min-aggregate.output';
import { ReadingPassageMaxAggregate } from './reading-passage-max-aggregate.output';

@ObjectType()
export class AggregateReadingPassage {

    @Field(() => ReadingPassageCountAggregate, {nullable:true})
    _count?: ReadingPassageCountAggregate;

    @Field(() => ReadingPassageAvgAggregate, {nullable:true})
    _avg?: ReadingPassageAvgAggregate;

    @Field(() => ReadingPassageSumAggregate, {nullable:true})
    _sum?: ReadingPassageSumAggregate;

    @Field(() => ReadingPassageMinAggregate, {nullable:true})
    _min?: ReadingPassageMinAggregate;

    @Field(() => ReadingPassageMaxAggregate, {nullable:true})
    _max?: ReadingPassageMaxAggregate;
}
