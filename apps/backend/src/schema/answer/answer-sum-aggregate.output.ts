import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class AnswerSumAggregate {

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Int, {nullable:true})
    blank_position?: number;
}
