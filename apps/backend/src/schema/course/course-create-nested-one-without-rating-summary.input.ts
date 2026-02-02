import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutRatingSummaryInput } from './course-create-without-rating-summary.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutRatingSummaryInput } from './course-create-or-connect-without-rating-summary.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutRatingSummaryInput {

    @Field(() => CourseCreateWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseCreateWithoutRatingSummaryInput)
    create?: CourseCreateWithoutRatingSummaryInput;

    @Field(() => CourseCreateOrConnectWithoutRatingSummaryInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutRatingSummaryInput)
    connectOrCreate?: CourseCreateOrConnectWithoutRatingSummaryInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
