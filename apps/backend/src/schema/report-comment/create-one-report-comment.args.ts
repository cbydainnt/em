import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentCreateInput } from './report-comment-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneReportCommentArgs {

    @Field(() => ReportCommentCreateInput, {nullable:false})
    @Type(() => ReportCommentCreateInput)
    data!: ReportCommentCreateInput;
}
