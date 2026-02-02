import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class NotificationSumAggregate {

    @Field(() => Int, {nullable:true})
    type?: number;

    @Field(() => Int, {nullable:true})
    status?: number;
}
