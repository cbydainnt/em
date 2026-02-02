import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Question } from '../question/question.model';
import { ReadingPassageCount } from './reading-passage-count.output';

@ObjectType()
export class ReadingPassage {

    @Field(() => ID, {nullable:false})
    reading_passage_id!: string;

    @Field(() => String, {nullable:true})
    title!: string | null;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    difficulty!: number;

    @Field(() => [String], {nullable:true})
    tags!: Array<string>;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering!: any | null;

    @Field(() => [Question], {nullable:true})
    questions?: Array<Question>;

    @Field(() => ReadingPassageCount, {nullable:false})
    _count?: ReadingPassageCount;
}
