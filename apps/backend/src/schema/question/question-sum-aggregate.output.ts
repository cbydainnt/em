import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuestionSumAggregate {

    @Field(() => Int, {nullable:true})
    question_type?: number;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Int, {nullable:true})
    points?: number;

    @Field(() => Int, {nullable:true})
    difficulty?: number;

    @Field(() => Int, {nullable:true})
    audio_order?: number;
}
