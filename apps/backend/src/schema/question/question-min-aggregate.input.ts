import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class QuestionMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    question_id?: true;

    @Field(() => Boolean, {nullable:true})
    quiz_id?: true;

    @Field(() => Boolean, {nullable:true})
    question_text?: true;

    @Field(() => Boolean, {nullable:true})
    question_image?: true;

    @Field(() => Boolean, {nullable:true})
    question_type?: true;

    @Field(() => Boolean, {nullable:true})
    order?: true;

    @Field(() => Boolean, {nullable:true})
    points?: true;

    @Field(() => Boolean, {nullable:true})
    difficulty?: true;

    @Field(() => Boolean, {nullable:true})
    explanation?: true;

    @Field(() => Boolean, {nullable:true})
    audio_id?: true;

    @Field(() => Boolean, {nullable:true})
    audio_order?: true;

    @Field(() => Boolean, {nullable:true})
    reading_passage_id?: true;

    @Field(() => Boolean, {nullable:true})
    del_flg?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    updated_at?: true;
}
