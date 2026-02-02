import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class QuizAudioSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    duration_seconds?: true;

    @Field(() => Boolean, {nullable:true})
    total_questions?: true;
}
