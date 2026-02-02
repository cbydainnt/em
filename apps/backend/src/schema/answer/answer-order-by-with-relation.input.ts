import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { QuestionOrderByWithRelationInput } from '../question/question-order-by-with-relation.input';

@InputType()
export class AnswerOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    answer_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_image?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_correct?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    match_key?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    blank_position?: keyof typeof SortOrder;

    @Field(() => QuestionOrderByWithRelationInput, {nullable:true})
    question?: QuestionOrderByWithRelationInput;
}
