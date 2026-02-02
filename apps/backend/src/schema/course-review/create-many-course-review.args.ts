import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewCreateManyInput } from './course-review-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCourseReviewArgs {

    @Field(() => [CourseReviewCreateManyInput], {nullable:false})
    @Type(() => CourseReviewCreateManyInput)
    data!: Array<CourseReviewCreateManyInput>;
}
