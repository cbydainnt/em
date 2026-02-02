import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { QuizAudioCountAggregate } from './quiz-audio-count-aggregate.output';
import { QuizAudioAvgAggregate } from './quiz-audio-avg-aggregate.output';
import { QuizAudioSumAggregate } from './quiz-audio-sum-aggregate.output';
import { QuizAudioMinAggregate } from './quiz-audio-min-aggregate.output';
import { QuizAudioMaxAggregate } from './quiz-audio-max-aggregate.output';

@ObjectType()
export class AggregateQuizAudio {

    @Field(() => QuizAudioCountAggregate, {nullable:true})
    _count?: QuizAudioCountAggregate;

    @Field(() => QuizAudioAvgAggregate, {nullable:true})
    _avg?: QuizAudioAvgAggregate;

    @Field(() => QuizAudioSumAggregate, {nullable:true})
    _sum?: QuizAudioSumAggregate;

    @Field(() => QuizAudioMinAggregate, {nullable:true})
    _min?: QuizAudioMinAggregate;

    @Field(() => QuizAudioMaxAggregate, {nullable:true})
    _max?: QuizAudioMaxAggregate;
}
