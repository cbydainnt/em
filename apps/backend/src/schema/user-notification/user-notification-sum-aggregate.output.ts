import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserNotificationSumAggregate {

    @Field(() => Int, {nullable:true})
    status?: number;
}
