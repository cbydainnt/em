import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutAudioInput } from './question-update-without-audio.input';

@InputType()
export class QuestionUpdateWithWhereUniqueWithoutAudioInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateWithoutAudioInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutAudioInput)
    data!: QuestionUpdateWithoutAudioInput;
}
