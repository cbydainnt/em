import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateWithoutReportInput } from './report-comment-create-without-report.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateOrConnectWithoutReportInput } from './report-comment-create-or-connect-without-report.input';
import { ReportCommentCreateManyReportInputEnvelope } from './report-comment-create-many-report-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';

@InputType()
export class ReportCommentUncheckedCreateNestedManyWithoutReportInput {

    @Field(() => [ReportCommentCreateWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentCreateWithoutReportInput)
    create?: Array<ReportCommentCreateWithoutReportInput>;

    @Field(() => [ReportCommentCreateOrConnectWithoutReportInput], {nullable:true})
    @Type(() => ReportCommentCreateOrConnectWithoutReportInput)
    connectOrCreate?: Array<ReportCommentCreateOrConnectWithoutReportInput>;

    @Field(() => ReportCommentCreateManyReportInputEnvelope, {nullable:true})
    @Type(() => ReportCommentCreateManyReportInputEnvelope)
    createMany?: ReportCommentCreateManyReportInputEnvelope;

    @Field(() => [ReportCommentWhereUniqueInput], {nullable:true})
    @Type(() => ReportCommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>>;
}
