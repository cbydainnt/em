import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutAudioInput } from './question-create-without-audio.input';

@InputType()
export class QuestionCreateOrConnectWithoutAudioInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionCreateWithoutAudioInput, {nullable:false})
    @Type(() => QuestionCreateWithoutAudioInput)
    create!: QuestionCreateWithoutAudioInput;
}
