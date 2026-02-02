import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutReading_passageInput } from './question-create-without-reading-passage.input';

@InputType()
export class QuestionCreateOrConnectWithoutReading_passageInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionCreateWithoutReading_passageInput, {nullable:false})
    @Type(() => QuestionCreateWithoutReading_passageInput)
    create!: QuestionCreateWithoutReading_passageInput;
}
