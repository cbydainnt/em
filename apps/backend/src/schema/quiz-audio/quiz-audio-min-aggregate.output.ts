import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizAudioMinAggregate {

    @Field(() => String, {nullable:true})
    audio_id?: string;

    @Field(() => String, {nullable:true})
    quiz_id?: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:true})
    audio_url?: string;

    @Field(() => String, {nullable:true})
    file_name?: string;

    @Field(() => Int, {nullable:true})
    duration_seconds?: number;

    @Field(() => String, {nullable:true})
    transcript?: string;

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;
}
