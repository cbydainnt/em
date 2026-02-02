import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class QuizAudioMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    audio_id?: true;

    @Field(() => Boolean, {nullable:true})
    quiz_id?: true;

    @Field(() => Boolean, {nullable:true})
    title?: true;

    @Field(() => Boolean, {nullable:true})
    audio_url?: true;

    @Field(() => Boolean, {nullable:true})
    file_name?: true;

    @Field(() => Boolean, {nullable:true})
    duration_seconds?: true;

    @Field(() => Boolean, {nullable:true})
    transcript?: true;

    @Field(() => Boolean, {nullable:true})
    total_questions?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;
}
