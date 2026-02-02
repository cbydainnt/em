import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { MSystemCountAggregate } from './m-system-count-aggregate.output';
import { MSystemAvgAggregate } from './m-system-avg-aggregate.output';
import { MSystemSumAggregate } from './m-system-sum-aggregate.output';
import { MSystemMinAggregate } from './m-system-min-aggregate.output';
import { MSystemMaxAggregate } from './m-system-max-aggregate.output';

@ObjectType()
export class AggregateMSystem {

    @Field(() => MSystemCountAggregate, {nullable:true})
    _count?: MSystemCountAggregate;

    @Field(() => MSystemAvgAggregate, {nullable:true})
    _avg?: MSystemAvgAggregate;

    @Field(() => MSystemSumAggregate, {nullable:true})
    _sum?: MSystemSumAggregate;

    @Field(() => MSystemMinAggregate, {nullable:true})
    _min?: MSystemMinAggregate;

    @Field(() => MSystemMaxAggregate, {nullable:true})
    _max?: MSystemMaxAggregate;
}
