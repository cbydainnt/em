import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewCreateManyCourseInput } from './course-review-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class CourseReviewCreateManyCourseInputEnvelope {

    @Field(() => [CourseReviewCreateManyCourseInput], {nullable:false})
    @Type(() => CourseReviewCreateManyCourseInput)
    data!: Array<CourseReviewCreateManyCourseInput>;
}
