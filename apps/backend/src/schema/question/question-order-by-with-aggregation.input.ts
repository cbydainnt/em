import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { QuestionCountOrderByAggregateInput } from './question-count-order-by-aggregate.input';
import { QuestionAvgOrderByAggregateInput } from './question-avg-order-by-aggregate.input';
import { QuestionMaxOrderByAggregateInput } from './question-max-order-by-aggregate.input';
import { QuestionMinOrderByAggregateInput } from './question-min-order-by-aggregate.input';
import { QuestionSumOrderByAggregateInput } from './question-sum-order-by-aggregate.input';

@InputType()
export class QuestionOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_image?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    points?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    explanation?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    reading_passage_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => QuestionCountOrderByAggregateInput, {nullable:true})
    _count?: QuestionCountOrderByAggregateInput;

    @Field(() => QuestionAvgOrderByAggregateInput, {nullable:true})
    _avg?: QuestionAvgOrderByAggregateInput;

    @Field(() => QuestionMaxOrderByAggregateInput, {nullable:true})
    _max?: QuestionMaxOrderByAggregateInput;

    @Field(() => QuestionMinOrderByAggregateInput, {nullable:true})
    _min?: QuestionMinOrderByAggregateInput;

    @Field(() => QuestionSumOrderByAggregateInput, {nullable:true})
    _sum?: QuestionSumOrderByAggregateInput;
}
