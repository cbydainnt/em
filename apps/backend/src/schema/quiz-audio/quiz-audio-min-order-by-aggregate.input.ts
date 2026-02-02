import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class QuizAudioMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    audio_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    quiz_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    audio_url?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    file_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    duration_seconds?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    transcript?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_questions?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;
}
