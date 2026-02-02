import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ReadingPassageSumAggregate {

    @Field(() => Int, {nullable:true})
    difficulty?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;
}
