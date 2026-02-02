import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { Type } from 'class-transformer';
import { RatingSummaryCreateWithoutCourseInput } from './rating-summary-create-without-course.input';

@InputType()
export class RatingSummaryCreateOrConnectWithoutCourseInput {

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:false})
    @Type(() => RatingSummaryWhereUniqueInput)
    where!: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;

    @Field(() => RatingSummaryCreateWithoutCourseInput, {nullable:false})
    @Type(() => RatingSummaryCreateWithoutCourseInput)
    create!: RatingSummaryCreateWithoutCourseInput;
}
