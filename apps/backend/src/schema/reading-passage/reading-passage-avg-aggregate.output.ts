import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ReadingPassageAvgAggregate {

    @Field(() => Float, {nullable:true})
    difficulty?: number;

    @Field(() => Float, {nullable:true})
    total_questions?: number;
}
