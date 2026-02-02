import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class QuestionAvgAggregate {

    @Field(() => Float, {nullable:true})
    question_type?: number;

    @Field(() => Float, {nullable:true})
    order?: number;

    @Field(() => Float, {nullable:true})
    points?: number;

    @Field(() => Float, {nullable:true})
    difficulty?: number;

    @Field(() => Float, {nullable:true})
    audio_order?: number;
}
