import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RatingSummaryCreateWithoutCourseInput } from './rating-summary-create-without-course.input';
import { Type } from 'class-transformer';
import { RatingSummaryCreateOrConnectWithoutCourseInput } from './rating-summary-create-or-connect-without-course.input';
import { RatingSummaryUpsertWithoutCourseInput } from './rating-summary-upsert-without-course.input';
import { RatingSummaryWhereInput } from './rating-summary-where.input';
import { Prisma } from '@prisma/client';
import { RatingSummaryWhereUniqueInput } from './rating-summary-where-unique.input';
import { RatingSummaryUpdateToOneWithWhereWithoutCourseInput } from './rating-summary-update-to-one-with-where-without-course.input';

@InputType()
export class RatingSummaryUpdateOneWithoutCourseNestedInput {

    @Field(() => RatingSummaryCreateWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryCreateWithoutCourseInput)
    create?: RatingSummaryCreateWithoutCourseInput;

    @Field(() => RatingSummaryCreateOrConnectWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryCreateOrConnectWithoutCourseInput)
    connectOrCreate?: RatingSummaryCreateOrConnectWithoutCourseInput;

    @Field(() => RatingSummaryUpsertWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryUpsertWithoutCourseInput)
    upsert?: RatingSummaryUpsertWithoutCourseInput;

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    disconnect?: RatingSummaryWhereInput;

    @Field(() => RatingSummaryWhereInput, {nullable:true})
    @Type(() => RatingSummaryWhereInput)
    delete?: RatingSummaryWhereInput;

    @Field(() => RatingSummaryWhereUniqueInput, {nullable:true})
    @Type(() => RatingSummaryWhereUniqueInput)
    connect?: Prisma.AtLeast<RatingSummaryWhereUniqueInput, 'id' | 'course_id'>;

    @Field(() => RatingSummaryUpdateToOneWithWhereWithoutCourseInput, {nullable:true})
    @Type(() => RatingSummaryUpdateToOneWithWhereWithoutCourseInput)
    update?: RatingSummaryUpdateToOneWithWhereWithoutCourseInput;
}
