import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuestionCountAggregate } from './question-count-aggregate.output';
import { QuestionAvgAggregate } from './question-avg-aggregate.output';
import { QuestionSumAggregate } from './question-sum-aggregate.output';
import { QuestionMinAggregate } from './question-min-aggregate.output';
import { QuestionMaxAggregate } from './question-max-aggregate.output';

@ObjectType()
export class QuestionGroupBy {

    @Field(() => String, {nullable:false})
    question_id!: string;

    @Field(() => String, {nullable:true})
    quiz_id?: string;

    @Field(() => String, {nullable:false})
    question_text!: string;

    @Field(() => String, {nullable:true})
    question_image?: string;

    @Field(() => Int, {nullable:false})
    question_type!: number;

    @Field(() => Int, {nullable:false})
    order!: number;

    @Field(() => Int, {nullable:false})
    points!: number;

    @Field(() => Int, {nullable:false})
    difficulty!: number;

    @Field(() => String, {nullable:true})
    explanation?: string;

    @Field(() => String, {nullable:true})
    audio_id?: string;

    @Field(() => Int, {nullable:true})
    audio_order?: number;

    @Field(() => String, {nullable:true})
    reading_passage_id?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => QuestionCountAggregate, {nullable:true})
    _count?: QuestionCountAggregate;

    @Field(() => QuestionAvgAggregate, {nullable:true})
    _avg?: QuestionAvgAggregate;

    @Field(() => QuestionSumAggregate, {nullable:true})
    _sum?: QuestionSumAggregate;

    @Field(() => QuestionMinAggregate, {nullable:true})
    _min?: QuestionMinAggregate;

    @Field(() => QuestionMaxAggregate, {nullable:true})
    _max?: QuestionMaxAggregate;
}
