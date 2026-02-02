import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class NotificationAvgAggregate {

    @Field(() => Float, {nullable:true})
    type?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
