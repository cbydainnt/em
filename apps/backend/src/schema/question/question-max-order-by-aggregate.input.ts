import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class QuestionMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_image?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    points?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    difficulty?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    explanation?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_order?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    reading_passage_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    del_flg?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updated_at?: keyof typeof SortOrder;
}
