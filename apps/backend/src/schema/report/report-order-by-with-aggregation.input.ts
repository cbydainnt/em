import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ReportCountOrderByAggregateInput } from './report-count-order-by-aggregate.input';
import { ReportAvgOrderByAggregateInput } from './report-avg-order-by-aggregate.input';
import { ReportMaxOrderByAggregateInput } from './report-max-order-by-aggregate.input';
import { ReportMinOrderByAggregateInput } from './report-min-order-by-aggregate.input';
import { ReportSumOrderByAggregateInput } from './report-sum-order-by-aggregate.input';

@InputType()
export class ReportOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    report_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    report_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    screenshot_urls?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    priority?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolved_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolved_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resolution_notes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_anonymous?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    allow_contact?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => ReportCountOrderByAggregateInput, {nullable:true})
    _count?: ReportCountOrderByAggregateInput;

    @Field(() => ReportAvgOrderByAggregateInput, {nullable:true})
    _avg?: ReportAvgOrderByAggregateInput;

    @Field(() => ReportMaxOrderByAggregateInput, {nullable:true})
    _max?: ReportMaxOrderByAggregateInput;

    @Field(() => ReportMinOrderByAggregateInput, {nullable:true})
    _min?: ReportMinOrderByAggregateInput;

    @Field(() => ReportSumOrderByAggregateInput, {nullable:true})
    _sum?: ReportSumOrderByAggregateInput;
}
