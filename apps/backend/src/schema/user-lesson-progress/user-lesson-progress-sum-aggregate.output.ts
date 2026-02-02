import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserLessonProgressSumAggregate {

    @Field(() => Int, {nullable:true})
    watched_seconds?: number;

    @Field(() => Int, {nullable:true})
    completed?: number;
}
