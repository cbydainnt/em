import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class UserNotificationAvgAggregate {

    @Field(() => Float, {nullable:true})
    status?: number;
}
