import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutRatingSummaryInput } from './course-update-without-rating-summary.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutRatingSummaryInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutRatingSummaryInput, {nullable:false})
    @Type(() => CourseUpdateWithoutRatingSummaryInput)
    data!: CourseUpdateWithoutRatingSummaryInput;
}
