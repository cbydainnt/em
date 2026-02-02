import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateManyUserInput } from './course-review-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class CourseReviewCreateManyUserInputEnvelope {

    @Field(() => [CourseReviewCreateManyUserInput], {nullable:false})
    @Type(() => CourseReviewCreateManyUserInput)
    data!: Array<CourseReviewCreateManyUserInput>;
}
