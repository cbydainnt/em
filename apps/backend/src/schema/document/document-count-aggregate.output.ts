import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DocumentCountAggregate {

    @Field(() => Int, {nullable:false})
    document_id!: number;

    @Field(() => Int, {nullable:false})
    document_url!: number;

    @Field(() => Int, {nullable:false})
    extension!: number;

    @Field(() => Int, {nullable:false})
    document_name!: number;

    @Field(() => Int, {nullable:false})
    size!: number;

    @Field(() => Int, {nullable:false})
    isDownloadable!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    lesson_id!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
