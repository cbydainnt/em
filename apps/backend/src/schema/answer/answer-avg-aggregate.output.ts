import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class AnswerAvgAggregate {

    @Field(() => Float, {nullable:true})
    order?: number;

    @Field(() => Float, {nullable:true})
    blank_position?: number;
}
