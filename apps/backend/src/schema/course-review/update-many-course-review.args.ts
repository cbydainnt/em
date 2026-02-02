import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewUpdateManyMutationInput } from './course-review-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CourseReviewWhereInput } from './course-review-where.input';

@ArgsType()
export class UpdateManyCourseReviewArgs {

    @Field(() => CourseReviewUpdateManyMutationInput, {nullable:false})
    @Type(() => CourseReviewUpdateManyMutationInput)
    data!: CourseReviewUpdateManyMutationInput;

    @Field(() => CourseReviewWhereInput, {nullable:true})
    @Type(() => CourseReviewWhereInput)
    where?: CourseReviewWhereInput;
}
