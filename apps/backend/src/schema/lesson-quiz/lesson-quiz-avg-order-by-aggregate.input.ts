import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class LessonQuizAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;
}
