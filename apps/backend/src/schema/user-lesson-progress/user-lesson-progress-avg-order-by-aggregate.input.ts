import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserLessonProgressAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    watched_seconds?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    completed?: keyof typeof SortOrder;
}
