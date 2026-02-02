import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserCourseSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_paused_days?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pause_count?: keyof typeof SortOrder;
}
