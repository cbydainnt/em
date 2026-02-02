import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentUpdateInput } from './report-comment-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';

@ArgsType()
export class UpdateOneReportCommentArgs {

    @Field(() => ReportCommentUpdateInput, {nullable:false})
    @Type(() => ReportCommentUpdateInput)
    data!: ReportCommentUpdateInput;

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;
}
