import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentUpdateManyMutationInput } from './report-comment-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ReportCommentWhereInput } from './report-comment-where.input';

@ArgsType()
export class UpdateManyReportCommentArgs {

    @Field(() => ReportCommentUpdateManyMutationInput, {nullable:false})
    @Type(() => ReportCommentUpdateManyMutationInput)
    data!: ReportCommentUpdateManyMutationInput;

    @Field(() => ReportCommentWhereInput, {nullable:true})
    @Type(() => ReportCommentWhereInput)
    where?: ReportCommentWhereInput;
}
