import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReportCommentWhereInput } from './report-comment-where.input';

@InputType()
export class ReportCommentListRelationFilter {

    @Field(() => ReportCommentWhereInput, {nullable:true})
    every?: ReportCommentWhereInput;

    @Field(() => ReportCommentWhereInput, {nullable:true})
    some?: ReportCommentWhereInput;

    @Field(() => ReportCommentWhereInput, {nullable:true})
    none?: ReportCommentWhereInput;
}
