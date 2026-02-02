import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RatingSummaryUpdateWithoutCourseInput } from './rating-summary-update-without-course.input';
import { Type } from 'class-transformer';
import { RatingSummaryCreateWithoutCourseInput } from './rating-summary-create-without-course.input';
import { RatingSummaryWhereInput } from './rating-summary-where.input';

@InputType()
export class RatingSummaryUpsertWithoutCourseInput {

    @Field(() => RatingSummaryUpdateWithoutCourseInput, {nullable:false})
    @Type(() => RatingSummaryUpdateWithoutCourseInput)
    update!: RatingSummaryUpdateWithoutCourseInput;

    @Field(() => RatingSummaryCreateWithoutCourseInput, {nullable:false})
    @Type(() => RatingSummaryCreateWithoutCourseInput)
    create!: RatingSummaryCreateWithoutCourseInput;

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;
}
