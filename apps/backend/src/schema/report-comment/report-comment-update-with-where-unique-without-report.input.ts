import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCommentUpdateWithoutReportInput } from './report-comment-update-without-report.input';

@InputType()
export class ReportCommentUpdateWithWhereUniqueWithoutReportInput {

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;

    @Field(() => ReportCommentUpdateWithoutReportInput, {nullable:false})
    @Type(() => ReportCommentUpdateWithoutReportInput)
    data!: ReportCommentUpdateWithoutReportInput;
}
