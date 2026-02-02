import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ActiveCodeAvgAggregate {

    @Field(() => Float, {nullable:true})
    item_type?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
