import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseReviewScalarWhereInput } from './course-review-scalar-where.input';
import { Type } from 'class-transformer';
import { CourseReviewUpdateManyMutationInput } from './course-review-update-many-mutation.input';

@InputType()
export class CourseReviewUpdateManyWithWhereWithoutUserInput {

    @Field(() => CourseReviewScalarWhereInput, {nullable:false})
    @Type(() => CourseReviewScalarWhereInput)
    where!: CourseReviewScalarWhereInput;

    @Field(() => CourseReviewUpdateManyMutationInput, {nullable:false})
    @Type(() => CourseReviewUpdateManyMutationInput)
    data!: CourseReviewUpdateManyMutationInput;
}
