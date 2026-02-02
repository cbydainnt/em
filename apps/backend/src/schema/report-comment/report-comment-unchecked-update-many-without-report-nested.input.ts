import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateWithoutReportInput } from './report-comment-create-without-report.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateOrConnectWithoutReportInput } from './report-comment-create-or-connect-without-report.input';
import { ReportCommentUpsertWithWhereUniqueWithoutReportInput } from './report-comment-upsert-with-where-unique-without-report.input';
import { ReportCommentCreateManyReportInputEnvelope } from './report-comment-create-many-report-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { ReportCommentUpdateWithWhereUniqueWithoutReportInput } from './report-comment-update-with-where-unique-without-report.input';
import { ReportCommentUpdateManyWithWhereWithoutReportInput } from './report-comment-update-many-with-where-without-report.input';
import { ReportCommentScalarWhereInput } from './report-comment-scalar-where.input';

@InputType()
export class ReportCommentUncheckedUpdateManyWithoutReportNestedInput {

    @Field(() => [ReportCommentCreateWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentCreateWithoutReportInput)
    create?: Array<ReportCommentCreateWithoutReportInput>;

    @Field(() => [ReportCommentCreateOrConnectWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentCreateOrConnectWithoutReportInput)
    connectOrCreate?: Array<ReportCommentCreateOrConnectWithoutReportInput>;

    @Field(() => [ReportCommentUpsertWithWhereUniqueWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentUpsertWithWhereUniqueWithoutReportInput)
    upsert?: Array<ReportCommentUpsertWithWhereUniqueWithoutReportInput>;

    @Field(() => ReportCommentCreateManyReportInputEnvelope, {nullable:true})
    @Type(() => ReportCommentCreateManyReportInputEnvelope)
    createMany?: ReportCommentCreateManyReportInputEnvelope;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;

    @Field(() => [ReportCommentUpdateWithWhereUniqueWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentUpdateWithWhereUniqueWithoutReportInput)
    update?: Array<ReportCommentUpdateWithWhereUniqueWithoutReportInput>;

    @Field(() => [ReportCommentUpdateManyWithWhereWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentUpdateManyWithWhereWithoutReportInput)
    updateMany?: Array<ReportCommentUpdateManyWithWhereWithoutReportInput>;

    @Field(() => [ReportCommentScalarWhereInput], {nullable:true})
    @Type(() => ReportCommentScalarWhereInput)
    deleteMany?: Array<ReportCommentScalarWhereInput>;
}
