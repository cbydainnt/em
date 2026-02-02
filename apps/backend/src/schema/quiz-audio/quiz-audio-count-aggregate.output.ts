import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class QuizAudioCountAggregate {

    @Field(() => Int, {nullable:false})
    audio_id!: number;

    @Field(() => Int, {nullable:false})
    quiz_id!: number;

    @Field(() => Int, {nullable:false})
    title!: number;

    @Field(() => Int, {nullable:false})
    audio_url!: number;

    @Field(() => Int, {nullable:false})
    file_name!: number;

    @Field(() => Int, {nullable:false})
    duration_seconds!: number;

    @Field(() => Int, {nullable:false})
    transcript!: number;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    question_ordering!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
