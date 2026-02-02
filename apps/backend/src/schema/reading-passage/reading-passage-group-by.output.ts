import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ReadingPassageCountAggregate } from './reading-passage-count-aggregate.output';
import { ReadingPassageAvgAggregate } from './reading-passage-avg-aggregate.output';
import { ReadingPassageSumAggregate } from './reading-passage-sum-aggregate.output';
import { ReadingPassageMinAggregate } from './reading-passage-min-aggregate.output';
import { ReadingPassageMaxAggregate } from './reading-passage-max-aggregate.output';

@ObjectType()
export class ReadingPassageGroupBy {

    @Field(() => String, {nullable:false})
    reading_passage_id!: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false})
    difficulty!: number;

    @Field(() => [String], {nullable:true})
    tags?: Array<string>;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering?: any;

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
