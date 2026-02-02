import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Type } from 'class-transformer';
import { QuestionUpdateWithoutQuizInput } from './question-update-without-quiz.input';
import { QuestionCreateWithoutQuizInput } from './question-create-without-quiz.input';

@InputType()
export class QuestionUpsertWithWhereUniqueWithoutQuizInput {

    @Field(() => QuestionWhereUniqueInput, {nullable:false})
    @Type(() => QuestionWhereUniqueInput)
    where!: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => QuestionUpdateWithoutQuizInput, {nullable:false})
    @Type(() => QuestionUpdateWithoutQuizInput)
    update!: QuestionUpdateWithoutQuizInput;

    @Field(() => QuestionCreateWithoutQuizInput, {nullable:false})
    @Type(() => QuestionCreateWithoutQuizInput)
    create!: QuestionCreateWithoutQuizInput;
}
