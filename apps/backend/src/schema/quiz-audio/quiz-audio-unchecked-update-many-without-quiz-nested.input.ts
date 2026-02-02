import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioCreateWithoutQuizInput } from './quiz-audio-create-without-quiz.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateOrConnectWithoutQuizInput } from './quiz-audio-create-or-connect-without-quiz.input';
import { QuizAudioUpsertWithWhereUniqueWithoutQuizInput } from './quiz-audio-upsert-with-where-unique-without-quiz.input';
import { QuizAudioCreateManyQuizInputEnvelope } from './quiz-audio-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { QuizAudioUpdateWithWhereUniqueWithoutQuizInput } from './quiz-audio-update-with-where-unique-without-quiz.input';
import { QuizAudioUpdateManyWithWhereWithoutQuizInput } from './quiz-audio-update-many-with-where-without-quiz.input';
import { QuizAudioScalarWhereInput } from './quiz-audio-scalar-where.input';

@InputType()
export class QuizAudioUncheckedUpdateManyWithoutQuizNestedInput {

    @Field(() => [QuizAudioCreateWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioCreateWithoutQuizInput)
    create?: Array<QuizAudioCreateWithoutQuizInput>;

    @Field(() => [QuizAudioCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<QuizAudioCreateOrConnectWithoutQuizInput>;

    @Field(() => [QuizAudioUpsertWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioUpsertWithWhereUniqueWithoutQuizInput)
    upsert?: Array<QuizAudioUpsertWithWhereUniqueWithoutQuizInput>;

    @Field(() => QuizAudioCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => QuizAudioCreateManyQuizInputEnvelope)
    createMany?: QuizAudioCreateManyQuizInputEnvelope;

    @Field(() => [QuizAudioWhereUniqueInput], {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    set?: Array<Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>>;

    @Field(() => [QuizAudioWhereUniqueInput], {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>>;

    @Field(() => [QuizAudioWhereUniqueInput], {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>>;

    @Field(() => [QuizAudioWhereUniqueInput], {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>>;

    @Field(() => [QuizAudioUpdateWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioUpdateWithWhereUniqueWithoutQuizInput)
    update?: Array<QuizAudioUpdateWithWhereUniqueWithoutQuizInput>;

    @Field(() => [QuizAudioUpdateManyWithWhereWithoutQuizInput], {nullable:true})
    @Type(() => QuizAudioUpdateManyWithWhereWithoutQuizInput)
    updateMany?: Array<QuizAudioUpdateManyWithWhereWithoutQuizInput>;

    @Field(() => [QuizAudioScalarWhereInput], {nullable:true})
    @Type(() => QuizAudioScalarWhereInput)
    deleteMany?: Array<QuizAudioScalarWhereInput>;
}
