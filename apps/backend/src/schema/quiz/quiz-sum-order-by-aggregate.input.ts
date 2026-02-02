import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class QuizSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    quiz_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_points?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    passing_score?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    duration_minutes?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty_level?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    version?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    max_attempts?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;
}
