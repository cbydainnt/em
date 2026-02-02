import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutAudioInput } from './question-update-without-audio.input';
import { QuestionCreateWithoutAudioInput } from './question-create-without-audio.input';

@InputType()
export class QuestionUpsertWithWhereUniqueWithoutAudioInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateWithoutAudioInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutAudioInput)
    update!: QuestionUpdateWithoutAudioInput;

    @Field(() => QuestionCreateWithoutAudioInput, {nullable:false})
    @Type(() => QuestionCreateWithoutAudioInput)
    create!: QuestionCreateWithoutAudioInput;
}
