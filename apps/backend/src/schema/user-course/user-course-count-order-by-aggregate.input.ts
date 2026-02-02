import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserCourseCountOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    enrolled_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    last_accessed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expired_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    paused_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pause_until?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_paused_days?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pause_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;
}
