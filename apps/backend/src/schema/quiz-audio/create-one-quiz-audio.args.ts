import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioCreateInput } from './quiz-audio-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneQuizAudioArgs {

    @Field(() => QuizAudioCreateInput, {nullable:false})
    @Type(() => QuizAudioCreateInput)
    data!: QuizAudioCreateInput;
}
