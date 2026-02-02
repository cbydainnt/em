import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentWhereInput } from './report-comment-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyReportCommentArgs {

    @Field(() => ReportCommentWhereInput, {nullable:true})
    @Type(() => ReportCommentWhereInput)
    where?: ReportCommentWhereInput;
}
