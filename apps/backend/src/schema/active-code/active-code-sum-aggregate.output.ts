import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ActiveCodeSumAggregate {

    @Field(() => Int, {nullable:true})
    item_type?: number;

    @Field(() => Int, {nullable:true})
    status?: number;
}
