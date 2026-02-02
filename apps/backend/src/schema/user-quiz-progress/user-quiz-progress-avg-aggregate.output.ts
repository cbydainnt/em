import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class UserQuizProgressAvgAggregate {

    @Field(() => Float, {nullable:true})
    score?: number;

    @Field(() => Float, {nullable:true})
    percentage?: number;

    @Field(() => Float, {nullable:true})
    total_questions?: number;

    @Field(() => Float, {nullable:true})
    correct_answers?: number;

    @Field(() => Float, {nullable:true})
    status?: number;

    @Field(() => Float, {nullable:true})
    time_spent?: number;

    @Field(() => Float, {nullable:true})
    attempts?: number;
}
