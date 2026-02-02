import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Type } from 'class-transformer';
import { RatingSummaryUpdateWithoutCourseInput } from './rating-summary-update-without-course.input';

@InputType()
export class RatingSummaryUpdateToOneWithWhereWithoutCourseInput {

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    where?: RatingSummaryWhereInput;

    @Field(() => RatingSummaryUpdateWithoutCourseInput, {nullable:false})
    @Type(() => RatingSummaryUpdateWithoutCourseInput)
    data!: RatingSummaryUpdateWithoutCourseInput;
}
