import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutRatingSummaryInput } from './course-update-without-rating-summary.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutRatingSummaryInput } from './course-create-without-rating-summary.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutRatingSummaryInput {

    @Field(() => CourseUpdateWithoutRatingSummaryInput, {nullable:false})
    @Type(() => CourseUpdateWithoutRatingSummaryInput)
    update!: CourseUpdateWithoutRatingSummaryInput;

    @Field(() => CourseCreateWithoutRatingSummaryInput, {nullable:false})
    @Type(() => CourseCreateWithoutRatingSummaryInput)
    create!: CourseCreateWithoutRatingSummaryInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
