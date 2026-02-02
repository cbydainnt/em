import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Type } from 'class-transformer';
import { QuizAudioUpdateWithoutQuestionsInput } from './quiz-audio-update-without-questions.input';

@InputType()
export class QuizAudioUpdateToOneWithWhereWithoutQuestionsInput {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;

    @Field(() => QuizAudioUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizAudioUpdateWithoutQuestionsInput)
    data!: QuizAudioUpdateWithoutQuestionsInput;
}
