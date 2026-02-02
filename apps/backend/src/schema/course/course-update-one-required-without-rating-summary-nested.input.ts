import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutRatingSummaryInput } from './course-create-without-rating-summary.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutRatingSummaryInput } from './course-create-or-connect-without-rating-summary.input';
import { CourseUpsertWithoutRatingSummaryInput } from './course-upsert-without-rating-summary.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutRatingSummaryInput } from './course-update-to-one-with-where-without-rating-summary.input';

@InputType()
export class CourseUpdateOneRequiredWithoutRatingSummaryNestedInput {

    @Field(() => CourseCreateWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseCreateWithoutRatingSummaryInput)
    create?: CourseCreateWithoutRatingSummaryInput;

    @Field(() => CourseCreateOrConnectWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutRatingSummaryInput)
    connectOrCreate?: CourseCreateOrConnectWithoutRatingSummaryInput;

    @Field(() => CourseUpsertWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseUpsertWithoutRatingSummaryInput)
    upsert?: CourseUpsertWithoutRatingSummaryInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutRatingSummaryInput)
    update?: CourseUpdateToOneWithWhereWithoutRatingSummaryInput;
}
