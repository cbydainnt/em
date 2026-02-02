import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioUpdateManyMutationInput } from './quiz-audio-update-many-mutation.input';
import { Type } from 'class-transformer';
import { QuizAudioWhereInput } from './quiz-audio-where.input';

@ArgsType()
export class UpdateManyQuizAudioArgs {

    @Field(() => QuizAudioUpdateManyMutationInput, {nullable:false})
    @Type(() => QuizAudioUpdateManyMutationInput)
    data!: QuizAudioUpdateManyMutationInput;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;
}
