import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutAudioInput } from './question-create-without-audio.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutAudioInput } from './question-create-or-connect-without-audio.input';
import { QuestionCreateManyAudioInputEnvelope } from './question-create-many-audio-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';

@InputType()
export class QuestionUncheckedCreateNestedManyWithoutAudioInput {

    @Field(() => [QuestionCreateWithoutAudioInput], {nullable:true})
    @Type(() => QuestionCreateWithoutAudioInput)
    create?: Array<QuestionCreateWithoutAudioInput>;

    @Field(() => [QuestionCreateOrConnectWithoutAudioInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutAudioInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutAudioInput>;

    @Field(() => QuestionCreateManyAudioInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyAudioInputEnvelope)
    createMany?: QuestionCreateManyAudioInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;
}
