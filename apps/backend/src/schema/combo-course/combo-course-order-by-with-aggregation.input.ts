import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ComboCourseCountOrderByAggregateInput } from './combo-course-count-order-by-aggregate.input';
import { ComboCourseMaxOrderByAggregateInput } from './combo-course-max-order-by-aggregate.input';
import { ComboCourseMinOrderByAggregateInput } from './combo-course-min-order-by-aggregate.input';

@InputType()
export class ComboCourseOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    combo_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    course_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => ComboCourseCountOrderByAggregateInput, {nullable:true})
    _count?: ComboCourseCountOrderByAggregateInput;

    @Field(() => ComboCourseMaxOrderByAggregateInput, {nullable:true})
    _max?: ComboCourseMaxOrderByAggregateInput;

    @Field(() => ComboCourseMinOrderByAggregateInput, {nullable:true})
    _min?: ComboCourseMinOrderByAggregateInput;
}
