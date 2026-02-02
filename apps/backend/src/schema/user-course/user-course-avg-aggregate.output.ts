import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class UserCourseAvgAggregate {

    @Field(() => Float, {nullable:true})
    status?: number;

    @Field(() => Float, {nullable:true})
    total_paused_days?: number;

    @Field(() => Float, {nullable:true})
    pause_count?: number;
}
