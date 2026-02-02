import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class RatingSummaryAvgAggregate {

    @Field(() => Float, {nullable:true})
    avg_rating?: number;

    @Field(() => Float, {nullable:true})
    total_reviews?: number;

    @Field(() => Float, {nullable:true})
    rating_1_count?: number;

    @Field(() => Float, {nullable:true})
    rating_2_count?: number;

    @Field(() => Float, {nullable:true})
    rating_3_count?: number;

    @Field(() => Float, {nullable:true})
    rating_4_count?: number;

    @Field(() => Float, {nullable:true})
    rating_5_count?: number;
}
