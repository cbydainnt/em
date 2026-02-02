import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReportCommentWhereInput } from './report-comment-where.input';
import { Type } from 'class-transformer';
import { ReportCommentOrderByWithAggregationInput } from './report-comment-order-by-with-aggregation.input';
import { ReportCommentScalarFieldEnum } from './report-comment-scalar-field.enum';
import { ReportCommentScalarWhereWithAggregatesInput } from './report-comment-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ReportCommentCountAggregateInput } from './report-comment-count-aggregate.input';
import { ReportCommentMinAggregateInput } from './report-comment-min-aggregate.input';
import { ReportCommentMaxAggregateInput } from './report-comment-max-aggregate.input';

@ArgsType()
export class ReportCommentGroupByArgs {

    @Field(() => ReportCommentWhereInput, {nullable:true})
    @Type(() => ReportCommentWhereInput)
    where?: ReportCommentWhereInput;

    @Field(() => [ReportCommentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ReportCommentOrderByWithAggregationInput>;

    @Field(() => [ReportCommentScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ReportCommentScalarFieldEnum>;

    @Field(() => ReportCommentScalarWhereWithAggregatesInput, {nullable:true})
    having?: ReportCommentScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ReportCommentCountAggregateInput, {nullable:true})
    _count?: ReportCommentCountAggregateInput;

    @Field(() => ReportCommentMinAggregateInput, {nullable:true})
    _min?: ReportCommentMinAggregateInput;

    @Field(() => ReportCommentMaxAggregateInput, {nullable:true})
    _max?: ReportCommentMaxAggregateInput;
}
