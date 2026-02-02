import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CourseReviewSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    rating?: true;
}
