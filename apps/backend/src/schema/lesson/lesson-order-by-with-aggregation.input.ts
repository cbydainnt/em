import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { LessonCountOrderByAggregateInput } from './lesson-count-order-by-aggregate.input';
import { LessonAvgOrderByAggregateInput } from './lesson-avg-order-by-aggregate.input';
import { LessonMaxOrderByAggregateInput } from './lesson-max-order-by-aggregate.input';
import { LessonMinOrderByAggregateInput } from './lesson-min-order-by-aggregate.input';
import { LessonSumOrderByAggregateInput } from './lesson-sum-order-by-aggregate.input';

@InputType()
export class LessonOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    lesson_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_video?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_thumbnail?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minutes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    video_duration?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_by?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    section_id?: keyof typeof SortOrder;

    @Field(() => LessonCountOrderByAggregateInput, {nullable:true})
    _count?: LessonCountOrderByAggregateInput;

    @Field(() => LessonAvgOrderByAggregateInput, {nullable:true})
    _avg?: LessonAvgOrderByAggregateInput;

    @Field(() => LessonMaxOrderByAggregateInput, {nullable:true})
    _max?: LessonMaxOrderByAggregateInput;

    @Field(() => LessonMinOrderByAggregateInput, {nullable:true})
    _min?: LessonMinOrderByAggregateInput;

    @Field(() => LessonSumOrderByAggregateInput, {nullable:true})
    _sum?: LessonSumOrderByAggregateInput;
}
