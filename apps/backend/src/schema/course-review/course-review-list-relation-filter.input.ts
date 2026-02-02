import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewWhereInput } from './course-review-where.input';

@InputType()
export class CourseReviewListRelationFilter {

    @Field(() => CourseReviewWhereInput, {nullable:true})
    every?: CourseReviewWhereInput;

    @Field(() => CourseReviewWhereInput, {nullable:true})
    some?: CourseReviewWhereInput;

    @Field(() => CourseReviewWhereInput, {nullable:true})
    none?: CourseReviewWhereInput;
}
