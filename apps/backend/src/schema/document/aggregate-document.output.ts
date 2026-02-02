import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DocumentCountAggregate } from './document-count-aggregate.output';
import { DocumentAvgAggregate } from './document-avg-aggregate.output';
import { DocumentSumAggregate } from './document-sum-aggregate.output';
import { DocumentMinAggregate } from './document-min-aggregate.output';
import { DocumentMaxAggregate } from './document-max-aggregate.output';

@ObjectType()
export class AggregateDocument {

    @Field(() => DocumentCountAggregate, {nullable:true})
    _count?: DocumentCountAggregate;

    @Field(() => DocumentAvgAggregate, {nullable:true})
    _avg?: DocumentAvgAggregate;

    @Field(() => DocumentSumAggregate, {nullable:true})
    _sum?: DocumentSumAggregate;

    @Field(() => DocumentMinAggregate, {nullable:true})
    _min?: DocumentMinAggregate;

    @Field(() => DocumentMaxAggregate, {nullable:true})
    _max?: DocumentMaxAggregate;
}
