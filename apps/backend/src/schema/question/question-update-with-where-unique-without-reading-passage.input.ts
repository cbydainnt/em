import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutReading_passageInput } from './question-update-without-reading-passage.input';

@InputType()
export class QuestionUpdateWithWhereUniqueWithoutReading_passageInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateWithoutReading_passageInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutReading_passageInput)
    data!: QuestionUpdateWithoutReading_passageInput;
}
