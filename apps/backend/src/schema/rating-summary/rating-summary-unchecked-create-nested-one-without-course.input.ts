import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RatingSummaryCreateWithoutCourseInput } from './rating-summary-create-without-course.input';
import { Type } from 'class-transformer';
import { RatingSummaryCreateOrConnectWithoutCourseInput } from './rating-summary-create-or-connect-without-course.input';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';

@InputType()
export class RatingSummaryUncheckedCreateNestedOneWithoutCourseInput {

    @Field(() => RatingSummaryCreateWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryCreateWithoutCourseInput)
    create?: RatingSummaryCreateWithoutCourseInput;

    @Field(() => RatingSummaryCreateOrConnectWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryCreateOrConnectWithoutCourseInput)
    connectOrCreate?: RatingSummaryCreateOrConnectWithoutCourseInput;

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:true})
    @Type(() => RatingSummaryWhereUniqueInput)
    connect?: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;
}
