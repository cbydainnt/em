import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioCreateManyInput } from './quiz-audio-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyQuizAudioArgs {

    @Field(() => [QuizAudioCreateManyInput], {nullable:false})
    @Type(() => QuizAudioCreateManyInput)
    data!: Array<QuizAudioCreateManyInput>;
}
