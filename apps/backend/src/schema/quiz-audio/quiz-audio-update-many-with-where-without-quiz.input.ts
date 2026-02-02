import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioScalarWhereInput } from './quiz-audio-scalar-where.input';
import { Type } from 'class-transformer';
import { QuizAudioUpdateManyMutationInput } from './quiz-audio-update-many-mutation.input';

@InputType()
export class QuizAudioUpdateManyWithWhereWithoutQuizInput {

    @Field(() => QuizAudioScalarWhereInput, {nullable:false})
    @Type(() => QuizAudioScalarWhereInput)
    where!: QuizAudioScalarWhereInput;

    @Field(() => QuizAudioUpdateManyMutationInput, {nullable:false})
    @Type(() => QuizAudioUpdateManyMutationInput)
    data!: QuizAudioUpdateManyMutationInput;
}
