import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CourseSumAggregate {

    @Field(() => Int, {nullable:true})
    course_price?: number;

    @Field(() => Int, {nullable:true})
    course_original_price?: number;

    @Field(() => Int, {nullable:true})
    access_duration_months?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;

    @Field(() => Int, {nullable:true})
    view_count?: number;
}
