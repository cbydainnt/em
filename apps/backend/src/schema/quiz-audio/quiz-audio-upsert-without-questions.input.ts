import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioUpdateWithoutQuestionsInput } from './quiz-audio-update-without-questions.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateWithoutQuestionsInput } from './quiz-audio-create-without-questions.input';
import { QuizAudioWhereInput } from './quiz-audio-where.input';

@InputType()
export class QuizAudioUpsertWithoutQuestionsInput {

    @Field(() => QuizAudioUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizAudioUpdateWithoutQuestionsInput)
    update!: QuizAudioUpdateWithoutQuestionsInput;

    @Field(() => QuizAudioCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizAudioCreateWithoutQuestionsInput)
    create!: QuizAudioCreateWithoutQuestionsInput;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;
}
