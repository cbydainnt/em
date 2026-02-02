import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CourseAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    course_price?: true;

    @Field(() => Boolean, {nullable:true})
    course_original_price?: true;

    @Field(() => Boolean, {nullable:true})
    access_duration_months?: true;

    @Field(() => Boolean, {nullable:true})
    access_type?: true;

    @Field(() => Boolean, {nullable:true})
    view_count?: true;
}
