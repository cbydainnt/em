import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizAudioSumAggregate {

    @Field(() => Int, {nullable:true})
    duration_seconds?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;
}
