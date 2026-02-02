import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CourseSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    course_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_original_price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_duration_months?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    access_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    view_count?: keyof typeof SortOrder;
}
