import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentCreateManyInput } from './report-comment-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyReportCommentArgs {

    @Field(() => [ReportCommentCreateManyInput], {nullable:false})
    @Type(() => ReportCommentCreateManyInput)
    data!: Array<ReportCommentCreateManyInput>;
}
