import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionCreateWithoutQuizInput } from './question-create-without-quiz.input';

@InputType()
export class QuestionCreateOrConnectWithoutQuizInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionCreateWithoutQuizInput, {nullable:false})
    @Type(() => QuestionCreateWithoutQuizInput)
    create!: QuestionCreateWithoutQuizInput;
}
