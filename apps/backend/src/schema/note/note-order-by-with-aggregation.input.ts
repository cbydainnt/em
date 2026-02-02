import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { NoteCountOrderByAggregateInput } from './note-count-order-by-aggregate.input';
import { NoteAvgOrderByAggregateInput } from './note-avg-order-by-aggregate.input';
import { NoteMaxOrderByAggregateInput } from './note-max-order-by-aggregate.input';
import { NoteMinOrderByAggregateInput } from './note-min-order-by-aggregate.input';
import { NoteSumOrderByAggregateInput } from './note-sum-order-by-aggregate.input';

@InputType()
export class NoteOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    note_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    content?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    timestamp?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    background_color?: keyof typeof SortOrder;

    @Field(() => NoteCountOrderByAggregateInput, {nullable:true})
    _count?: NoteCountOrderByAggregateInput;

    @Field(() => NoteAvgOrderByAggregateInput, {nullable:true})
    _avg?: NoteAvgOrderByAggregateInput;

    @Field(() => NoteMaxOrderByAggregateInput, {nullable:true})
    _max?: NoteMaxOrderByAggregateInput;

    @Field(() => NoteMinOrderByAggregateInput, {nullable:true})
    _min?: NoteMinOrderByAggregateInput;

    @Field(() => NoteSumOrderByAggregateInput, {nullable:true})
    _sum?: NoteSumOrderByAggregateInput;
}
