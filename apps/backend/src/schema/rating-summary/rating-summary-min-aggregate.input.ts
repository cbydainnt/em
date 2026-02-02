import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RatingSummaryMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    avg_rating?: true;

    @Field(() => Boolean, {nullable:true})
    total_reviews?: true;

    @Field(() => Boolean, {nullable:true})
    rating_1_count?: true;

    @Field(() => Boolean, {nullable:true})
    rating_2_count?: true;

    @Field(() => Boolean, {nullable:true})
    rating_3_count?: true;

    @Field(() => Boolean, {nullable:true})
    rating_4_count?: true;

    @Field(() => Boolean, {nullable:true})
    rating_5_count?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;
}
