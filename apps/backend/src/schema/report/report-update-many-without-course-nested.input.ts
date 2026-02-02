import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCreateWithoutCourseInput } from './report-create-without-course.input';
import { Type } from 'class-transformer';
import { ReportCreateOrConnectWithoutCourseInput } from './report-create-or-connect-without-course.input';
import { ReportUpsertWithWhereUniqueWithoutCourseInput } from './report-upsert-with-where-unique-without-course.input';
import { ReportCreateManyCourseInputEnvelope } from './report-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportWhereUniqueInput } from './report-where-unique.input';
import { ReportUpdateWithWhereUniqueWithoutCourseInput } from './report-update-with-where-unique-without-course.input';
import { ReportUpdateManyWithWhereWithoutCourseInput } from './report-update-many-with-where-without-course.input';
import { ReportScalarWhereInput } from './report-scalar-where.input';

@InputType()
export class ReportUpdateManyWithoutCourseNestedInput {

    @Field(() => [ReportCreateWithoutCourseInput], {nullable:true})
    @Type(() => ReportCreateWithoutCourseInput)
    create?: Array<ReportCreateWithoutCourseInput>;

    @Field(() => [ReportCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => ReportCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<ReportCreateOrConnectWithoutCourseInput>;

    @Field(() => [ReportUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => ReportUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<ReportUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => ReportCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => ReportCreateManyCourseInputEnvelope)
    createMany?: ReportCreateManyCourseInputEnvelope;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportWhereUniqueInput], {nullable:true})
    @Type(() => ReportWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportWhereUniqueInput, 'report_id'>>;

    @Field(() => [ReportUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => ReportUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<ReportUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [ReportUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => ReportUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<ReportUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [ReportScalarWhereInput], {nullable:true})
    @Type(() => ReportScalarWhereInput)
    deleteMany?: Array<ReportScalarWhereInput>;
}
