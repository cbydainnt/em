import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { Type } from 'class-transformer';
import { ReportUpdateWithoutCourseInput } from './report-update-without-course.input';
import { ReportCreateWithoutCourseInput } from './report-create-without-course.input';

@InputType()
export class ReportUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => ReportWhereUniqueInput, {nullable:false})
    @Type(() => ReportWhereUniqueInput)
    where!: Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>;

    @Field(() => ReportUpdateWithoutCourseInput, {nullable:false})
    @Type(() => ReportUpdateWithoutCourseInput)
    update!: ReportUpdateWithoutCourseInput;

    @Field(() => ReportCreateWithoutCourseInput, {nullable:false})
    @Type(() => ReportCreateWithoutCourseInput)
    create!: ReportCreateWithoutCourseInput;
}
