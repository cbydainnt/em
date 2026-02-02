import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentCreateManyReportInput } from './report-comment-create-many-report.input';
import { Type } from 'class-transformer';

@InputType()
export class ReportCommentCreateManyReportInputEnvelope {

    @Field(() => [ReportCommentCreateManyReportInput], {nullable:false})
    @Type(() => ReportCommentCreateManyReportInput)
    data!: Array<ReportCommentCreateManyReportInput>;
}
