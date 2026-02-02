import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CourseMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    state?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    thumbnail?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_duration_months?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_expire_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    view_count?: keyof typeof SortOrder;

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
}
