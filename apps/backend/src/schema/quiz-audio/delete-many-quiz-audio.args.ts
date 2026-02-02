import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyQuizAudioArgs {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;
}
