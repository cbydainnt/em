import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class CourseAvgAggregate {

    @Field(() => Float, {nullable:true})
    course_price?: number;

    @Field(() => Float, {nullable:true})
    course_original_price?: number;

    @Field(() => Float, {nullable:true})
    access_duration_months?: number;

    @Field(() => Float, {nullable:true})
    access_type?: number;

    @Field(() => Float, {nullable:true})
    view_count?: number;
}
