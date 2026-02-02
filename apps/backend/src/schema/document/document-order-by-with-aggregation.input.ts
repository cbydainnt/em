import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DocumentCountOrderByAggregateInput } from './document-count-order-by-aggregate.input';
import { DocumentAvgOrderByAggregateInput } from './document-avg-order-by-aggregate.input';
import { DocumentMaxOrderByAggregateInput } from './document-max-order-by-aggregate.input';
import { DocumentMinOrderByAggregateInput } from './document-min-order-by-aggregate.input';
import { DocumentSumOrderByAggregateInput } from './document-sum-order-by-aggregate.input';

@InputType()
export class DocumentOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    document_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    document_url?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    extension?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    document_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    size?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    isDownloadable?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => DocumentCountOrderByAggregateInput, {nullable:true})
    _count?: DocumentCountOrderByAggregateInput;

    @Field(() => DocumentAvgOrderByAggregateInput, {nullable:true})
    _avg?: DocumentAvgOrderByAggregateInput;

    @Field(() => DocumentMaxOrderByAggregateInput, {nullable:true})
    _max?: DocumentMaxOrderByAggregateInput;

    @Field(() => DocumentMinOrderByAggregateInput, {nullable:true})
    _min?: DocumentMinOrderByAggregateInput;

    @Field(() => DocumentSumOrderByAggregateInput, {nullable:true})
    _sum?: DocumentSumOrderByAggregateInput;
}
