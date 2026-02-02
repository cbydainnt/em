import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioCreateWithoutQuizInput } from './quiz-audio-create-without-quiz.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateOrConnectWithoutQuizInput } from './quiz-audio-create-or-connect-without-quiz.input';
import { QuizAudioCreateManyQuizInputEnvelope } from './quiz-audio-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';

@InputType()
export class QuizAudioUncheckedCreateNestedManyWithoutQuizInput {

    @Field(() => [QuizAudioCreateWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioCreateWithoutQuizInput)
    create?: Array<QuizAudioCreateWithoutQuizInput>;

    @Field(() => [QuizAudioCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<QuizAudioCreateOrConnectWithoutQuizInput>;

    @Field(() => QuizAudioCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => QuizAudioCreateManyQuizInputEnvelope)
    createMany?: QuizAudioCreateManyQuizInputEnvelope;

    @Field(() => [QuizAudioWhereUniqueInput], {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>>;
}
