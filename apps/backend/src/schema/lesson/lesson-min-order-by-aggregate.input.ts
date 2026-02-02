import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class LessonMinOrderByAggregateInput {

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
}
