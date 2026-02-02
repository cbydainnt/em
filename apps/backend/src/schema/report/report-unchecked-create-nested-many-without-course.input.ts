import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutCourseInput } from './report-create-without-course.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutCourseInput } from './report-create-or-connect-without-course.input';
import { ReportCreateManyCourseInputEnvelope } from './report-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';

@InputType()
export class ReportUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [ReportCreateWithoutCourseInput], {nullable:true})
    @Type(() => ReportCreateWithoutCourseInput)
    create?: Array<ReportCreateWithoutCourseInput>;

    @Field(() => [ReportCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutCourseInput>;

    @Field(() => ReportCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyCourseInputEnvelope)
    createMany?: ReportCreateManyCourseInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;
}
