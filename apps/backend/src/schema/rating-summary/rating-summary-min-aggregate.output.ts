import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RatingSummaryMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Float, {nullable:true})
    avg_rating?: number;

    @Field(() => Int, {nullable:true})
    total_reviews?: number;

    @Field(() => Int, {nullable:true})
    rating_1_count?: number;

    @Field(() => Int, {nullable:true})
    rating_2_count?: number;

    @Field(() => Int, {nullable:true})
    rating_3_count?: number;

    @Field(() => Int, {nullable:true})
    rating_4_count?: number;

    @Field(() => Int, {nullable:true})
    rating_5_count?: number;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;
}
