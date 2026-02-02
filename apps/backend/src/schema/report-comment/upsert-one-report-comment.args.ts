import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { Type } from 'class-transformer';
import { ReportCommentCreateInput } from './report-comment-create.input';
import { ReportCommentUpdateInput } from './report-comment-update.input';

@ArgsType()
export class UpsertOneReportCommentArgs {

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;

    @Field(() => ReportCommentCreateInput, {nullable:false})
    @Type(() => ReportCommentCreateInput)
    create!: ReportCommentCreateInput;

    @Field(() => ReportCommentUpdateInput, {nullable:false})
    @Type(() => ReportCommentUpdateInput)
    update!: ReportCommentUpdateInput;
}
