import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutReading_passageInput } from './question-update-without-reading-passage.input';
import { QuestionCreateWithoutReading_passageInput } from './question-create-without-reading-passage.input';

@InputType()
export class QuestionUpsertWithWhereUniqueWithoutReading_passageInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateWithoutReading_passageInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutReading_passageInput)
    update!: QuestionUpdateWithoutReading_passageInput;

    @Field(() => QuestionCreateWithoutReading_passageInput, {nullable:false})
    @Type(() => QuestionCreateWithoutReading_passageInput)
    create!: QuestionCreateWithoutReading_passageInput;
}
