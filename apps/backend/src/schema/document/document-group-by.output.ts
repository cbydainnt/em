import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { DocumentCountAggregate } from './document-count-aggregate.output';
import { DocumentAvgAggregate } from './document-avg-aggregate.output';
import { DocumentSumAggregate } from './document-sum-aggregate.output';
import { DocumentMinAggregate } from './document-min-aggregate.output';
import { DocumentMaxAggregate } from './document-max-aggregate.output';

@ObjectType()
export class DocumentGroupBy {

    @Field(() => String, {nullable:false})
    document_id!: string;

    @Field(() => String, {nullable:false})
    document_url!: string;

    @Field(() => String, {nullable:false})
    extension!: string;

    @Field(() => String, {nullable:false})
    document_name!: string;

    @Field(() => Int, {nullable:false})
    size!: number;

    @Field(() => Boolean, {nullable:false})
    isDownloadable!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

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
