import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class QuizAudioAvgAggregate {

    @Field(() => Float, {nullable:true})
    duration_seconds?: number;

    @Field(() => Float, {nullable:true})
    total_questions?: number;
}
