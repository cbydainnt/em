import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCourseSumAggregate {

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Int, {nullable:true})
    total_paused_days?: number;

    @Field(() => Int, {nullable:true})
    pause_count?: number;
}
