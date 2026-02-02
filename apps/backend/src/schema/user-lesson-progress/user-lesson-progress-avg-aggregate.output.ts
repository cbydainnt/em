import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class UserLessonProgressAvgAggregate {

    @Field(() => Float, {nullable:true})
    watched_seconds?: number;

    @Field(() => Float, {nullable:true})
    completed?: number;
}
