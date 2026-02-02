import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuestionCreateWithoutAudioInput } from './question-create-without-audio.input';
import { Type } from 'class-transformer';
import { QuestionCreateOrConnectWithoutAudioInput } from './question-create-or-connect-without-audio.input';
import { QuestionUpsertWithWhereUniqueWithoutAudioInput } from './question-upsert-with-where-unique-without-audio.input';
import { QuestionCreateManyAudioInputEnvelope } from './question-create-many-audio-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { QuestionUpdateWithWhereUniqueWithoutAudioInput } from './question-update-with-where-unique-without-audio.input';
import { QuestionUpdateManyWithWhereWithoutAudioInput } from './question-update-many-with-where-without-audio.input';
import { QuestionScalarWhereInput } from './question-scalar-where.input';

@InputType()
export class QuestionUncheckedUpdateManyWithoutAudioNestedInput {

    @Field(() => [QuestionCreateWithoutAudioInput], {nullable:true})
    @Type(() => QuestionCreateWithoutAudioInput)
    create?: Array<QuestionCreateWithoutAudioInput>;

    @Field(() => [QuestionCreateOrConnectWithoutAudioInput], {nullable:true})
    @Type(() => QuestionCreateOrConnectWithoutAudioInput)
    connectOrCreate?: Array<QuestionCreateOrConnectWithoutAudioInput>;

    @Field(() => [QuestionUpsertWithWhereUniqueWithoutAudioInput], {nullable:true})
    @Type(() => QuestionUpsertWithWhereUniqueWithoutAudioInput)
    upsert?: Array<QuestionUpsertWithWhereUniqueWithoutAudioInput>;

    @Field(() => QuestionCreateManyAudioInputEnvelope, {nullable:true})
    @Type(() => QuestionCreateManyAudioInputEnvelope)
    createMany?: QuestionCreateManyAudioInputEnvelope;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    set?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionWhereUniqueInput], {nullable:true})
    @Type(() => QuestionWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>>;

    @Field(() => [QuestionUpdateWithWhereUniqueWithoutAudioInput], {nullable:true})
    @Type(() => QuestionUpdateWithWhereUniqueWithoutAudioInput)
    update?: Array<QuestionUpdateWithWhereUniqueWithoutAudioInput>;

    @Field(() => [QuestionUpdateManyWithWhereWithoutAudioInput], {nullable:true})
    @Type(() => QuestionUpdateManyWithWhereWithoutAudioInput)
    updateMany?: Array<QuestionUpdateManyWithWhereWithoutAudioInput>;

    @Field(() => [QuestionScalarWhereInput], {nullable:true})
    @Type(() => QuestionScalarWhereInput)
    deleteMany?: Array<QuestionScalarWhereInput>;
}
