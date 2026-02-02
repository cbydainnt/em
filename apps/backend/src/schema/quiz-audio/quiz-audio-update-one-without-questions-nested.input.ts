import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioCreateWithoutQuestionsInput } from './quiz-audio-create-without-questions.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateOrConnectWithoutQuestionsInput } from './quiz-audio-create-or-connect-without-questions.input';
import { QuizAudioUpsertWithoutQuestionsInput } from './quiz-audio-upsert-without-questions.input';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { QuizAudioUpdateToOneWithWhereWithoutQuestionsInput } from './quiz-audio-update-to-one-with-where-without-questions.input';

@InputType()
export class QuizAudioUpdateOneWithoutQuestionsNestedInput {

    @Field(() => QuizAudioCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioCreateWithoutQuestionsInput)
    create?: QuizAudioCreateWithoutQuestionsInput;

    @Field(() => QuizAudioCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: QuizAudioCreateOrConnectWithoutQuestionsInput;

    @Field(() => QuizAudioUpsertWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioUpsertWithoutQuestionsInput)
    upsert?: QuizAudioUpsertWithoutQuestionsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    delete?: QuizAudioWhereInput;

    @Field(() => QuizAudioWhereUniqueInput, {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => QuizAudioUpdateToOneWithWhereWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioUpdateToOneWithWhereWithoutQuestionsInput)
    update?: QuizAudioUpdateToOneWithWhereWithoutQuestionsInput;
}
