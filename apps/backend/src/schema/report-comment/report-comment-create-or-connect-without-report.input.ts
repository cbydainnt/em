import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateWithoutReportInput } from './report-comment-create-without-report.input';

@InputType()
export class ReportCommentCreateOrConnectWithoutReportInput {

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;

    @Field(() => ReportCommentCreateWithoutReportInput, {nullable:false})
    @Type(() => ReportCommentCreateWithoutReportInput)
    create!: ReportCommentCreateWithoutReportInput;
}
