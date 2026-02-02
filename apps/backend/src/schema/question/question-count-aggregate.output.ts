import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuestionCountAggregate {

    @Field(() => Int, {nullable:false})
    question_id!: number;

    @Field(() => Int, {nullable:false})
    quiz_id!: number;

    @Field(() => Int, {nullable:false})
    question_text!: number;

    @Field(() => Int, {nullable:false})
    question_image!: number;

    @Field(() => Int, {nullable:false})
    question_type!: number;

    @Field(() => Int, {nullable:false})
    order!: number;

    @Field(() => Int, {nullable:false})
    points!: number;

    @Field(() => Int, {nullable:false})
    difficulty!: number;

    @Field(() => Int, {nullable:false})
    explanation!: number;

    @Field(() => Int, {nullable:false})
    audio_id!: number;

    @Field(() => Int, {nullable:false})
    audio_order!: number;

    @Field(() => Int, {nullable:false})
    reading_passage_id!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
