import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserQuizAnswerSumAggregate {

    @Field(() => Float, {nullable:true})
    points_earned?: number;

    @Field(() => Int, {nullable:true})
    time_spent?: number;
}
