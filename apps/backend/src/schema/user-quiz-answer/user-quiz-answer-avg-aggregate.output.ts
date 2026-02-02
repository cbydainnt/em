import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class UserQuizAnswerAvgAggregate {

    @Field(() => Float, {nullable:true})
    points_earned?: number;

    @Field(() => Float, {nullable:true})
    time_spent?: number;
}
