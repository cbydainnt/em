import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioCreateManyQuizInput } from './quiz-audio-create-many-quiz.input';
import { Type } from 'class-transformer';

@InputType()
export class QuizAudioCreateManyQuizInputEnvelope {

    @Field(() => [QuizAudioCreateManyQuizInput], {nullable:false})
    @Type(() => QuizAudioCreateManyQuizInput)
    data!: Array<QuizAudioCreateManyQuizInput>;
}
