import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReportCommentWhereUniqueInput } from './report-comment-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueReportCommentArgs {

    @Field(() => ReportCommentWhereUniqueInput, {nullable:false})
    @Type(() => ReportCommentWhereUniqueInput)
    where!: Prisma.AtLeast<ReportCommentWhereUniqueInput, 'comment_id'>;
}
