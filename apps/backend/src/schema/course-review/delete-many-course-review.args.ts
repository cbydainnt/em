import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewWhereInput } from './course-review-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCourseReviewArgs {

    @Field(() => CourseReviewWhereInput, {nullable:true})
    @Type(() => CourseReviewWhereInput)
    where?: CourseReviewWhereInput;
}
