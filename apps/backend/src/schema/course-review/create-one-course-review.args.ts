import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewCreateInput } from './course-review-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCourseReviewArgs {

    @Field(() => CourseReviewCreateInput, {nullable:false})
    @Type(() => CourseReviewCreateInput)
    data!: CourseReviewCreateInput;
}
