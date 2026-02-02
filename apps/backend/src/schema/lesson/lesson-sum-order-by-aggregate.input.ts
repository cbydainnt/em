import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class LessonSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    lesson_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lesson_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minutes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    video_duration?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;
}
