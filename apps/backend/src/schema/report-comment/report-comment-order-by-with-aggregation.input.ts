import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ReportCommentCountOrderByAggregateInput } from './report-comment-count-order-by-aggregate.input';
import { ReportCommentMaxOrderByAggregateInput } from './report-comment-max-order-by-aggregate.input';
import { ReportCommentMinOrderByAggregateInput } from './report-comment-min-order-by-aggregate.input';

@InputType()
export class ReportCommentOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    comment_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    report_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    content?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => ReportCommentCountOrderByAggregateInput, {nullable:true})
    _count?: ReportCommentCountOrderByAggregateInput;

    @Field(() => ReportCommentMaxOrderByAggregateInput, {nullable:true})
    _max?: ReportCommentMaxOrderByAggregateInput;

    @Field(() => ReportCommentMinOrderByAggregateInput, {nullable:true})
    _min?: ReportCommentMinOrderByAggregateInput;
}
